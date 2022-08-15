import { ForbiddenException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CourseLesson } from '../models/lesson.model';
import { LessonVideo } from '../models/video.model';

@EntityRepository(LessonVideo)
export class VideoRepository extends Repository<LessonVideo> {
  //***** Create a video *****//
  async createVideo(video: LessonVideo, lesson: string) {
    try {
      console.log('video', video);
      const videoEntity = new LessonVideo();
      videoEntity.fieldname = video.fieldname;
      videoEntity.originalname = video.originalname;
      videoEntity.encoding = video.encoding;
      videoEntity.mimetype = video.mimetype;
      videoEntity.destination = video.destination;
      videoEntity.filename = video.filename;
      videoEntity.path = video.path;
      videoEntity.size = video.size;
      videoEntity.lesson = lesson;
      console.log(videoEntity);
      await this.save(videoEntity);
      console.log('Last console');
      return {
        message: 'Video Added',
      };
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ForbiddenException('El video ya existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('El video no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al crear el video');
    }
  }
  //***** Find video by lesson ******//
  async getVideoByLesson(lessonId: string) {
    const videos = await this.findOne({ lesson: lessonId });
    if (!videos) {
      return null;
    }
    return videos;
  }

  //***** Delete a video *****//
  async deleteVideo(videoId: string) {
    const video = await this.delete({ id: videoId });
    if (!video) {
      throw new ForbiddenException('El video no existe');
    }
    return video;
  }

  async getVideoById(videoId: string) {
    const videos = await this.findOne({ id: videoId });
    if (!videos) {
      return null;
    }
    return videos;
  }

  async getAllVideo() {
    return await this.find({
      order: {
        updatedAt: 'DESC',
      },
    });
  }
}
