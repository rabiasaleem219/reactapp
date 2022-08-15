import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Roles } from 'src/users/enum/roles.enum';

export class RoleEmailsDto {
  @ApiProperty()
  @IsIn(Object.values(Roles))
  @IsNotEmpty()
  role: Roles;

  @ApiProperty()
  @IsNotEmpty()
  emailTitle: string;

  @ApiProperty()
  @IsOptional()
  emailMessage: string;
}
