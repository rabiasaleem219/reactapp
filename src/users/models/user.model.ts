import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Comment } from 'src/e-learning/courses/comments/entities/comment.model';
import { Roles } from '../enum/roles.enum';
import { Course } from 'src/e-learning/courses/models/course.model';
import { Score } from 'src/e-learning/score/models/score.model';
import { Payment } from 'src/payments/models/payment.model';

@Entity()
@Unique(['email', 'username', 'ci'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // @Column()
  // brithDate: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  ci: string;

  @Column({ default: false })
  image: string;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ enum: Roles, default: Roles.USER })
  role: Roles;

  @ManyToMany(() => Course, (course) => course.users, {
    onDelete: 'CASCADE',
  })
  // @JoinTable()
  courses: Course[];

  @OneToMany(() => Score, (score) => score.user, {
    onDelete: 'CASCADE',
  })
  scores: Score[];

  @OneToMany(() => Comment, (comment) => comment.course, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Payment, (payment) => payment.user, {
    onDelete: 'NO ACTION',
  })
  payments: Payment[];
}
