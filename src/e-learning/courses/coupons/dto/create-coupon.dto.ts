import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Course } from '../../models/course.model';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  course: Course;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  discount: number;
}
