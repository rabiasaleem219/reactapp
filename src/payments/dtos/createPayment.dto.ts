import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Coupon } from 'src/e-learning/courses/coupons/entities/coupon.model';
import { paymentMethod } from '../enums';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: paymentMethod })
  @IsEnum(paymentMethod)
  paymentMethod: paymentMethod;

  @ApiProperty()
  @IsString()
  paymentReference: string;

  @ApiProperty()
  @IsString()
  courseId: string;

  @IsString()
  @IsOptional()
  coupon: Coupon;
}
