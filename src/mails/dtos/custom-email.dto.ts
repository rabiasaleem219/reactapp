import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CustomEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  emails: [string];

  @ApiProperty()
  @IsNotEmpty()
  emailTitle: string;

  @ApiProperty()
  @IsOptional()
  emailMessage: string;
}
