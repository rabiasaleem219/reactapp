import { Course } from 'src/e-learning/courses/models/course.model';
import { CourseLesson } from 'src/e-learning/lessons/models/lesson.model';
import { Quiz } from 'src/e-learning/quizes/models/quiz.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  index: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Course, (course) => course.sections, {
    onDelete: 'CASCADE',
    eager: true,
  })
  course: Course;

  @OneToMany(() => Quiz, (quiz) => quiz.section, { onDelete: 'CASCADE' })
  quizes: Quiz[];

  @OneToMany(() => CourseLesson, (lesson) => lesson.section, {
    onDelete: 'CASCADE',
  })
  lessons: CourseLesson[];
}
