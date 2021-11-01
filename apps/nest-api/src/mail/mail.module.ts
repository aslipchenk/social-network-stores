import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import "dotenv";

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.SEND_MAIL_LOGIN,
        pass: process.env.SEND_MAIL_PASSWORD,
      },
    },
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),]
})
export class MailModule {}
