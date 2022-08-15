import { IsString, IsNotEmpty } from 'class-validator';
import { Course } from '../../models/course.model';

export class VerifyCouponDto {
  @IsString()
  @IsNotEmpty()
  course: Course;

  @IsString()
  @IsNotEmpty()
  name: string;
}
