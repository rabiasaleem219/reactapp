import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsModule } from 'src/e-learning/courses/coupons/coupons.module';
import { CoursesModule } from 'src/e-learning/courses/courses.module';
import { UsersModule } from 'src/users/users.module';
import { PaymentsController } from './controllers/payments.controller';
import { Account } from './models/accounts.model';
import { Payment } from './models/payment.model';
import { PaymentsService } from './services/payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Account]),
    UsersModule,
    CouponsModule,
    CoursesModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
