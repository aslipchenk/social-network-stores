import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
