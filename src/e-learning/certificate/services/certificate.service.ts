import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/e-learning/courses/services/courses.service';
import { QuizService } from 'src/e-learning/quizes/services/quiz.service';
import { ScoreService } from 'src/e-learning/score/services/score.service';
import { MailsService } from 'src/mails/services/mails.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { Certificate } from '../models/certificate.model';
const pdf = require('html-pdf');
import { getContent } from '../../../mails/certificates/model';
import path from 'path';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';
const fsExtra = require('fs-extra');
import fs from 'fs';

@Injectable()
export class CertificateService {
  constructor(
    private readonly quizService: QuizService,
    private readonly scoreService: ScoreService,
    private readonly userService: UsersService,
    private readonly mailService: MailsService,
    @InjectS3() private readonly s3: S3,
    private readonly courseService: CoursesService,
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  private sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

  async syncPdf(firstName, lastName, title, certificateId) {
    return new Promise(async (resolve, reject) => {
      await pdf
        .create(getContent(firstName, lastName, title, certificateId))
        .toBuffer(function (err, buffer) {
          console.log(err, 'buffer: ' + buffer);
          return resolve(buffer);
        });
    });
  }

  //*****  Get Certificate *****//
  async getCertificate(userId: string, courseId: string) {
    try {
      const quizzes = await this.quizService.getQuizByCourse(courseId);
      const scores = await this.scoreService.findScoresByUser(userId);
      const user = await this.userService.findById(userId);
      const course = await this.courseService.getCourseById(courseId);

      const filteredScores = scores.filter((score) => {
        return score.courseId === courseId;
      });
      const passedScores = filteredScores.filter((score) => {
        return score.status === 'APROBADO';
      });
      if (quizzes.length === passedScores.length) {
        const certificateExists = await this.certificateRepository.findOne({
          where: { userId, courseId },
        });
        if (!certificateExists) {
          const { firstName, lastName } = user;
          const { title } = course;
          const certificate = this.certificateRepository.create({
            userId,
            courseId,
          });
          await this.certificateRepository.save(certificate);
          const buffer2 = await this.syncPdf(
            firstName,
            lastName,
            title,
            certificate.id,
          );
          await this.sleep(2000);
          console.log('buffer', buffer2);
          try {
            const uploaded = await this.s3
              .upload({
                Bucket: 'ozono',
                Key: `certificates/${certificate.id}`,
                Body: buffer2,
                ACL: 'public-read',
                ContentType: 'application/pdf',
                ContentDisposition: 'inline',
              })
              .promise();
            console.log(uploaded);
            certificate.url = uploaded.Location;
            certificate.key = uploaded.Key;
            await this.certificateRepository.save(certificate);
            console.log('returning');
            return {
              message: 'Certificado reclamado1',
              certificate: certificate,
              statusCode: 200,
            };
          } catch (err) {
            throw new ForbiddenException(
              err.message || 'Error al procesar certificado',
            );
          }
        }
        return {
          message: 'Certificado reclamado',
          certificate: certificateExists,
          statusCode: 200,
        };
        // const pdf = await this.mailService.sendCertificateMail(
        //   user,
        //   course,
        //   certificateExists.id,
        // );
        // console.log(pdf, 'sending email');
      } else {
        throw new ForbiddenException(
          'Tienes que aprobar todos los quizzes para obtener tu certificado',
        );
      }
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'Error al procesar certificado',
      );
    }
  }

  async getAll(userId) {
    return await this.certificateRepository.find({
      where: {
        userId,
      },
    });
  }
}
