import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Course } from 'src/e-learning/courses/models/course.model';
import { User } from 'src/users/models/user.model';

export class CreateCommentDto {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  stars: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  course: Course;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  user: User;
}
