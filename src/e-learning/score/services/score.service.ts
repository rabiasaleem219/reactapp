import { ForbiddenException, Injectable } from '@nestjs/common';
import { CoursesService } from 'src/e-learning/courses/services/courses.service';
import { OptionsService } from 'src/e-learning/options/services/options.service';
import { Question } from 'src/e-learning/questions/models/question.model';
import { QuestionsService } from 'src/e-learning/questions/services/questions.service';
import { QuizService } from 'src/e-learning/quizes/services/quiz.service';
import { SectionsService } from 'src/e-learning/sections/services/sections.service';
import { UsersService } from 'src/users/services/users.service';
import { CreateScoreDto, CreateScoreWithUserIdDto } from '../dtos';
import { Status } from '../enum/status.enum';
import { ScoreRepository } from '../repository/score.repository';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly userService: UsersService,
    private readonly courseService: CoursesService,
    private readonly quizService: QuizService,
    private readonly questionService: QuestionsService,
    private readonly optionsService: OptionsService,
    private readonly sectionService: SectionsService,
  ) {}

  //***** SET USER SCORE  ******//
  async createScore(userId: string, createScoreDto: CreateScoreDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('No existe el usuario');
    }
    const course = await this.courseService.getCourseById(
      createScoreDto.courseId,
    );
    if (!course) {
      throw new Error('No existe el curso');
    }
    const quiz = await this.quizService.getQuizById(createScoreDto.quizId);
    if (!quiz) {
      throw new Error('No existe el quiz');
    }
    const questions = await this.questionService.getQuestionsByQuiz(
      createScoreDto.quizId,
    );
    if (!questions) {
      throw new Error('No existen preguntas para este quiz');
    }
    const score = await this.calculateScore(createScoreDto.options, questions);
    console.log(score);
    const status = score > 75 ? Status.APPROVED : Status.REPROVED;
    return await this.scoreRepository.createScore(
      user,
      createScoreDto.courseId,
      createScoreDto.quizId,
      score,
      status,
    );
  }

  //***** Calculate Score *****//
  async calculateScore(
    options: { title: string; isCorrect: boolean }[],
    questions: Question[],
  ) {
    if (options.length !== questions.length) {
      throw new ForbiddenException(
        'Las preguntas y las respuestas no son iguales',
      );
    }
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const option = options[i];
      if (option.isCorrect) {
        score++;
      }
    }
    const finalScore = Math.round((score * 100) / questions.length);
    return finalScore;
  }

  //***** Get users score *****//
  async findScoresByUser(userId: string) {
    const scores = await this.scoreRepository.find({
      where: { userId },
    });
    const responseObject = scores.map(async (score) => {
      const quiz = await this.quizService.getQuizById(score.quizId);
      const course = await this.courseService.getCourseById(score.courseId);
      return { ...score, quiz, course };
    });
    return await Promise.all(responseObject);
  }

  //***** ADMIN SET USER SCORE  ******//
  async createScoreWithUser(createScoreWithUserId: CreateScoreWithUserIdDto) {
    const user = await this.userService.findById(createScoreWithUserId.userId);
    if (!user) {
      throw new Error('No existe el usuario');
    }
    const course = await this.courseService.getCourseById(
      createScoreWithUserId.courseId,
    );
    if (!course) {
      throw new Error('No existe el curso');
    }
    const quiz = await this.quizService.getQuizById(
      createScoreWithUserId.quizId,
    );
    if (!quiz) {
      throw new Error('No existe el quiz');
    }
  }
}
