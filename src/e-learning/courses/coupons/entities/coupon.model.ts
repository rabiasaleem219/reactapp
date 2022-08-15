import { Payment } from 'src/payments/models/payment.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../models/course.model';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  discount: number;

  @Column({ default: 'estudiante' })
  role: string;

  @ManyToOne(() => Course, (course) => course.coupons, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  course: Course;

  @OneToMany(() => Payment, (payment) => payment.coupon, {
    eager: true,
  })
  payments: Payment[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
