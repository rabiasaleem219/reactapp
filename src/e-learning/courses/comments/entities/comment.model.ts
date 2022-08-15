import { Course } from 'src/e-learning/courses/models/course.model';
import { User } from 'src/users/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stars: number;

  @Column()
  message: string;

  @ManyToOne(() => Course, (course) => course.comments, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  course: Course;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
