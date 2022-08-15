import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsModule } from '../sections/sections.module';
import { LessonsController } from './controllers/lessons.controller';
import { CourseLesson } from './models/lesson.model';
import { LessonVideo } from './models/video.model';
import { LessonRepository } from './repositories/lesson.repository';
import { VideoRepository } from './repositories/video.repository';
import { LessonsService } from './services/lessons.service';
import { LessonResource } from './models/resource.model';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonResource]),
    UploadModule,
    TypeOrmModule.forFeature([
      CourseLesson,
      LessonRepository,
      LessonVideo,
      VideoRepository,
    ]),
    SectionsModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
