import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SectionsService } from 'src/e-learning/sections/services/sections.service';
import { CreateLessonDto } from '../dtos';
import { UpdateLessonDto } from '../dtos/updateLesson.dto';
import { LessonRepository } from '../repositories/lesson.repository';
import { VideoRepository } from '../repositories/video.repository';
import { InjectS3, S3 } from 'nestjs-s3';
import s3Utils from '@zvs001/s3-utils';
import { LessonResource } from '../models/resource.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const fsExtra = require('fs-extra');
import { extname, parse, resolve } from 'path';
import fs from 'fs';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const Promise = require('bluebird');
@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly videoRepository: VideoRepository,
    private readonly sectionService: SectionsService,
    @InjectRepository(LessonResource)
    private lessonResourceRepository: Repository<LessonResource>,
    @InjectS3() private readonly s3: S3,
  ) {}

  //***** Create a lesson *****//
  async createLesson(lesson: CreateLessonDto, sectionId: string) {
    const section = await this.sectionService.findSectionById(sectionId);
    if (!section) {
      throw new ForbiddenException('No existe la seccion');
    }
    return this.lessonRepository.createLesson(lesson, section);
  }

  //***** Find lesson by id *****//
  async getLessonById(lessonId: string) {
    return this.lessonRepository.findOne(lessonId);
  }

  //***** Find lesson by section ******//
  async getLessonBySection(sectionId: string) {
    const lessons = await this.lessonRepository.findLessonBySection(sectionId);
    return lessons;
  }

  //***** Update a lesson *****//
  async updateLesson(lessonId: string, lesson: UpdateLessonDto) {
    const updatedLesson = await this.lessonRepository.updateLesson(
      lessonId,
      lesson,
    );
    if (!updatedLesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    return updatedLesson;
  }

  //***** Delete a lesson *****//

  async deleteLesson(lessonId: string) {
    const lesson = await this.lessonRepository.findOne(lessonId);

    if (!lesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    s3Utils
      .deleteDir(this.s3, {
        Bucket: 'ozono',
        Prefix: `${lesson.section.course.title}/${lesson.section.name}/${lesson.name}`,
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    const resources = await this.lessonResourceRepository.find({
      lesson: lessonId,
    });
    for (const resource of resources) {
      await this.lessonResourceRepository.delete(resource);
    }
    const video = await this.videoRepository.getVideoByLesson(lesson.id);
    if (video) await this.videoRepository.deleteVideo(video.id);
    const resp = await this.lessonRepository.deleteLesson(lessonId);
    return resp;
  }

  //! Upload files !//

  //**** Upload video *****//

  private processVideoSync(path, output, bitrate, name) {
    return new Promise((resolve, reject) => {
      ffmpeg(path)
        .output(output)
        .videoBitrate(`${bitrate}k`)
        .videoCodec('libx264')
        .size(`${name}x?`)
        .on('error', (err) => {
          console.log(err, 'error');
          return reject(err);
        })
        // .on('progress', (progress) => console.log(progress.frames, 'frames'))
        .on('end', () => {
          console.log('finished');
          return resolve();
        })
        .run();
    });
  }

  async uploadVideo(lessonId: string, video: any) {
    const lesson = await this.lessonRepository.findOne(lessonId);
    console.log(video);
    if (!lesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    const videoExist = await this.videoRepository.getVideoByLesson(lesson.id);
    if (videoExist) {
      try {
        s3Utils
          .deleteDir(this.s3, {
            Bucket: 'ozono',
            Prefix: `${lesson.section.course.title}/${lesson.section.name}/${lesson.name}/videos`,
          })
          .catch((error) => {
            console.log(error);
            throw new ForbiddenException(
              'No se pudo eliminar el video anterior',
            );
          });
        await this.videoRepository.deleteVideo(videoExist.id);
        console.log(`Video deleted now updateing`);
      } catch (error) {
        throw new ForbiddenException('No se pudo eliminar el video anterior');
      }
    }
    try {
      const onlyName = video.originalname.split('.')[0];
      const ress = [
        {
          name: '240',
          bitrate: 350,
          order: 0,
        },
        {
          name: '360',
          bitrate: 700,
          order: 1,
        },
        {
          name: '480',
          bitrate: 1200,
          order: 2,
        },
        {
          name: '720',
          bitrate: 2500,
          order: 3,
        },
        {
          name: '1080',
          bitrate: 5000,
          order: 4,
        },
      ];
      const path = `./files/lessons/${video.filename}`;
      const ext = extname(path);
      console.log(path, ext);
      const output = [];
      const blobs = [];

      for (const res of ress) {
        output.push(`./files/lessons/${onlyName}-${res.name}${ext}`);
        blobs.push(`${onlyName}-${res.name}${ext}`);
      }
      for (const [index, res] of ress.entries()) {
        await this.processVideoSync(path, output[index], res.bitrate, res.name);
      }
      console.log('output', 'Prmise working...');
      const keys = [];
      const locations = [];
      for (const [index, blob] of blobs.entries()) {
        const file = fs.readFileSync(output[index]);
        const list = await this.s3
          .upload({
            Bucket: 'ozono',
            Key: `${lesson.section.course.title}/${lesson.section.name}/${lesson.name}/videos/${blob}`,
            Body: file,
            ContentType: video.mimetype,
            ACL: 'public-read',
          })
          .promise();
        console.log(list, 'uploaded');
        keys.push({
          name: ress[index].name,
          key: list.Key,
        });
        locations.push({
          name: ress[index].name,
          url: list.Location,
        });
      }
      console.log('returning', keys, locations);
      fsExtra.emptyDirSync('./files/lessons');
      video.path = JSON.stringify(keys);
      video.destination = JSON.stringify(locations);
      console.log('I am here');
      const resp = await this.videoRepository.createVideo(video, lesson.id);
      console.log(resp, 'final reso');
      return resp;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  //
  async deleteVideo(videoId: string) {
    const videoExist = await this.videoRepository.getVideoById(videoId);
    if (!videoExist) {
      throw new ForbiddenException('No se pudo eliminar el video anterior');
    }
    const lesson = await this.lessonRepository.findOne(videoExist.lesson);
    if (!lesson) {
      throw new ForbiddenException('No se pudo eliminar el video anterior');
    }
    if (videoExist) {
      try {
        s3Utils
          .deleteDir(this.s3, {
            Bucket: 'ozono',
            Prefix: `${lesson.section.course.title}/${lesson.section.name}/${lesson.name}/videos`,
          })
          .catch((err) => {
            throw new ForbiddenException(err.message);
          });
        console.log('video', videoExist);
        const deleted = await this.videoRepository.deleteVideo(videoExist.id);
        console.log(deleted);
        return {
          message: 'Vídeo eliminado con éxito',
        };
      } catch (error) {
        throw new ForbiddenException('No se pudo eliminar el video anterior');
      }
    }
  }

  //**** Find video by lesson *****//
  async getVideoByLesson(lessonId: string) {
    const lesson = await this.lessonRepository.findOne(lessonId);
    if (!lesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    const video = await this.videoRepository.getVideoByLesson(lesson.id);
    if (!video) {
      return {
        message: 'Video no encontrado',
      };
    }
    console.log(JSON.parse(video.destination));
    return {
      links: JSON.parse(video.destination) || [],
    };
  }

  //Resources
  async uploadResources(lessonId: string, files: any) {
    const lesson = await this.lessonRepository.findOne(lessonId);
    if (!lesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    console.log(files);
    if (lesson) {
      try {
        s3Utils
          .deleteDir(this.s3, {
            Bucket: 'ozono',
            Prefix: `${lesson.section.course.title}/${lesson.section.name}/${lesson.name}/resources`,
          })
          .catch((error) => {
            console.log(error);
            throw new ForbiddenException(
              'No se pudo eliminar el video anterior',
            );
          });
        const resources = await this.lessonResourceRepository.find({
          lesson: lessonId,
        });
        for (const resource of resources) {
          await this.lessonResourceRepository.delete(resource);
        }
      } catch (error) {
        throw new ForbiddenException('No se pudo eliminar el video anterior');
      }
    }
    try {
      for (const file of files) {
        const param = {
          Bucket: 'ozono',
          Key: `${lesson.section.course.title}/${lesson.section.name}/${lesson.name}/resources/${file.originalname}`,
          Body: file.buffer,
          ACL: 'public-read',
        };
        const list = await this.s3.upload(param).promise();
        const resource = this.lessonResourceRepository.create({
          mimetype: file.mimetype,
          originalname: file.originalname,
          encoding: file.encoding,
          size: file.size,
          filename: file.originalname,
          path: list.Location,
          key: list.Key,
          lesson: lessonId,
          section: lesson.section.id,
        });
        await this.lessonResourceRepository.save(resource);
      }
      return {
        message: 'El archivo ha subido correctamente',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getResourceBySectionId(sectionId: string) {
    return await this.lessonResourceRepository.find({
      where: {
        section: sectionId,
      },
    });
  }

  async getResourceById(resourceId: string) {
    const resource = await this.lessonResourceRepository.findOne(resourceId);
    if (!resource) {
      throw new ForbiddenException('Recurso no encontrado');
    }
    try {
      const url = this.s3.getSignedUrl('getObject', {
        Bucket: 'ozono',
        Key: resource.key,
        Expires: 3600,
      });
      console.log(url);
      return {
        link: url,
        message: 'Found',
      };
    } catch {
      console.log('something went wrong');
      throw new BadRequestException('extraviado');
    }
  }

  getAllVideos() {
    return this.videoRepository.getAllVideo();
  }

  async getFirstLessonByCourseId(course) {
    const lesson = await this.lessonRepository.getFirstLessonByCourseId(course);
    console.log(`Course: `, lesson);
    if (!lesson) {
      return {
        message: 'No lesson found for course',
        statusCode: 404,
      };
    }
    return lesson;
  }
}
