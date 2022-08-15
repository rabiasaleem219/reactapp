import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { CoursesModule } from './e-learning/courses/courses.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { SectionsModule } from './e-learning/sections/sections.module';
import { ScoreModule } from './e-learning/score/score.module';
import { QuizModule } from './e-learning/quizes/quiz.module';
import { OptionsModule } from './e-learning/options/option.module';
import { QuestionModule } from './e-learning/questions/question.module';
import { LessonsModule } from './e-learning/lessons/lessons.module';
import { PaymentsModule } from './payments/payments.module';
import { MailsModule } from './mails/mails.module';
import { CertificateModule } from './e-learning/certificate/certificate.module';
import { CommentsModule } from './e-learning/courses/comments/comments.module';
import { CouponsModule } from './e-learning/courses/coupons/coupons.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    UploadModule,
    CoursesModule,
    SectionsModule,
    ScoreModule,
    QuizModule,
    OptionsModule,
    QuestionModule,
    LessonsModule,
    PaymentsModule,
    MailsModule,
    CertificateModule,
    CommentsModule,
    CouponsModule,
  ],
})
export class AppModule {}
