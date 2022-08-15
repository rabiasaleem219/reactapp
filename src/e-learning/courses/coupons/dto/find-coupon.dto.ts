import { IsNotEmpty, IsString } from 'class-validator';
import { Course } from '../../models/course.model';

export class FindCouponDto {
  @IsString()
  @IsNotEmpty()
  course: Course;
}
