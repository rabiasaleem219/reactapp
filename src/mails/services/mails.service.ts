import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Course } from 'src/e-learning/courses/models/course.model';
import { Payment } from 'src/payments/models/payment.model';
import { User } from 'src/users/models/user.model';
import { ContactDto } from '../dtos/contac.dto';
const pdf = require('html-pdf');
import path from 'path';
import { getContent } from '../certificates/model';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
  ) {}

  async sendEmailByRole({ role, emailMessage, emailTitle }) {
    const users = await this.userService.getUsersByRol(role);
    const emails = users.map((user) => user.email);
    console.log(emails);
    for (const email of emails) {
      try {
        await this.mailerService.sendMail({
          to: email,
          subject: emailTitle,
          from: process.env.MAIL_USERNAME,
          html: emailMessage,
        });
      } catch (error) {
        return { message: 'Algo salió mal', statusCode: 403 };
      }
    }
    return {
      message: 'Los correos electrónicos han sido enviados a las usuarias',
      statusCode: 200,
      emails,
      emailMessage,
      emailTitle,
    };
  }

  async sendCustomEmail({ emails, emailTitle, emailMessage }) {
    for (const email of emails) {
      try {
        await this.mailerService.sendMail({
          to: email,
          subject: emailTitle,
          from: process.env.MAIL_USERNAME,
          html: emailMessage,
        });
      } catch (error) {
        return { message: 'Algo salió mal', statusCode: 403 };
      }
    }
    return {
      message: 'Los correos electrónicos han sido enviados a las usuarias',
      statusCode: 200,
      emails,
      emailMessage,
      emailTitle,
    };
  }

  async sendMail() {
    await this.mailerService.sendMail({
      to: 'alejomedina161011@gmail.com, rouchjq8@gmail.com',
      from: 'alejomedina161011@gmail.com',
      subject: 'La solucion a todos tus problemas ✔',
      html: '',
      context: {
        name: 'Nest',
      },
    });
  }

  async sendApprovedPaymentMail(payment: Payment, course: Course, user: User) {
    const { amount, id, createdAt } = payment;
    const { title } = course;
    const { firstName, lastName } = user;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Pago aprobado ✔ || ' + title,
      template: 'approved-payment',
      context: {
        amount,
        id,
        course: title,
        name: firstName,
        lastname: lastName,
        date: createdAt,
      },
    });
  }

  async sendNoticePaymentMail(payment: Payment, course: Course, user: User) {
    try {
      const { amount, id, createdAt } = payment;
      const { title } = course;
      const { firstName, lastName } = user;

      await this.mailerService.sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: 'Solicitud de pago',
        template: 'notice-payment',
        context: {
          amount,
          id,
          course: title,
          name: firstName,
          lastname: lastName,
          date: createdAt,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendContactMail(contactDto: ContactDto) {
    console.log('sendContactMail');
    try {
      const email = await this.mailerService.sendMail({
        to: contactDto.email,
        subject: contactDto.supportType,
        from: process.env.MAIL_USERNAME,
        text: contactDto.message,
      });
      console.log('mailSent', email);
      return email;
    } catch (error) {
      console.log('error sending contact', error);
      return error;
    }
  }

  async sendCertificateMail(user: User, course: Course, certificateId: string) {
    try {
      const { firstName, lastName } = user;
      const { title } = course;

      await pdf
        .create(getContent(firstName, lastName, title, certificateId))
        .toFile(
          path.join(__dirname, `../../../certificates/${certificateId}.pdf`),
          function (err, res) {
            if (err) {
              null;
            } else {
              null;
            }
          },
        );

      try {
        const email = await this.mailerService.sendMail({
          to: user.email,
          subject: 'Certificado del curso ✔ || ' + title,
          from: process.env.MAIL_USERNAME,
          template: 'certificate',
          html: '<h1>Hello!</h1>',
        });

        console.log('user email', user.email, email);

        // await this.mailerService.sendMail({
        //   to: user.email,
        //   subject: 'Certificado del curso ✔ || ' + title,
        //   template: 'certificate',
        //   attachments: [
        //     {
        //       filename: `${certificateId}.pdf`,
        //       path: path.join(
        //         __dirname,
        //         `../../../certificates/${certificateId}.pdf`,
        //       ),
        //       contentType: 'application/pdf',
        //     },
        //   ],

        //   context: {
        //     name: firstName,
        //     lastname: lastName,
        //     course: title,
        //   },
        //});
      } catch (error) {
        console.log(error);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
