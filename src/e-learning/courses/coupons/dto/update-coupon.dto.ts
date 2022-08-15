import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Course } from '../../models/course.model';

export class UpdateCouponDto {
  @IsString()
  @IsNotEmpty()
  course: Course;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  discount: number;
}
