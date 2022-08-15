import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { User } from './models/user.model';
import { UsersRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
