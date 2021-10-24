import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    MailModule,
    TokenModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
