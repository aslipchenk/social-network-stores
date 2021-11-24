import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {
  }

  async sendResetPasswordEmail(email: string, temporaryPassword: string) {
    try {
      await this.mailService.sendMail(
        {
          to: email,
          from: 'aslipchenk.test.mailer@gmail.com',
          subject: 'Testing Nest Mailer Module',
          text: 'Welcome',
          html: `Your temporary password for login ${temporaryPassword}`
        }
      );
    } catch (e) {
      throw new HttpException(`Send activation link failed cause: ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async sendActivationMail(email: string, link: string): Promise<any> {
    try {
      await this.mailService.sendMail(
        {
          to: email,
          from: 'aslipchenk.test.mailer@gmail.com',
          subject: 'Testing Nest Mailer Module',
          text: 'Welcome',
          html: `<a href='${link}'>Activate your account</a>`
        }
      );
    } catch (e) {
      throw new HttpException(`Send activation link failed cause: ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
