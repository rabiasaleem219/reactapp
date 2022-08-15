import { Coupon } from 'src/e-learning/courses/coupons/entities/coupon.model';
import { User } from 'src/users/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { paymentMethod, PaymentStatus } from '../enums';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  paymentMethod: paymentMethod;

  @Column({
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column()
  paymentReference: string;

  @Column()
  courseId: string;

  @ManyToOne(() => Coupon, (coupon) => coupon.payments, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  coupon: Coupon;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'SET NULL',
    eager: true,
  })
  user: User;
}
