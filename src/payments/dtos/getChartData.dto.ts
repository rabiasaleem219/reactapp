import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ChartDataDto {
  @ApiProperty()
  @IsOptional()
  year: number;
}
