import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { OptionsModule } from '../options/option.module';
import { QuestionModule } from '../questions/question.module';
import { QuizModule } from '../quizes/quiz.module';
import { SectionsModule } from '../sections/sections.module';
import { ScoreController } from './controllers/score.controller';
import { Score } from './models/score.model';
import { ScoreRepository } from './repository/score.repository';
import { ScoreService } from './services/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score, ScoreRepository]),
    UsersModule,
    CoursesModule,
    QuizModule,
    QuestionModule,
    OptionsModule,
    SectionsModule,
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService],
})
export class ScoreModule {}
