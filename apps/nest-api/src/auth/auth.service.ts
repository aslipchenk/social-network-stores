import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../user/user.dto';
import { hash } from 'bcrypt';
import { PostgresErrorCode } from '../config/constats';
import * as uuid from 'uuid';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(registrateUserDto: UserDto): Promise<any> {
    const email: string = registrateUserDto.email;
    const candidate = await this.usersRepository.findOne({
      email,
    });
    if (candidate)
      throw new HttpException(
        'User with current email already exist',
        HttpStatus.BAD_REQUEST,
      );

    const password: string = registrateUserDto.password;
    const hashedPassword = await hash(password, 16);
    let userDtoOut = null;
    try {
      userDtoOut = await this.usersRepository.save({
        ...registrateUserDto,
        password: hashedPassword,
      });
    } catch (e) {
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email is already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        `Save user using userRepository save failed ${e?.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      console.log(e);
    }
    const activationLink: string = uuid.v4();
    await this.mailService.sendActivationMail(email, activationLink);

    const tokens = this.tokenService.generateTokens(userDtoOut.id);
    await this.tokenService.saveToken(userDtoOut.id, tokens.refreshToken);
    userDtoOut.password = undefined;

    return { ...userDtoOut, ...tokens };
  }

  async activate(link: string) {
    const user = await this.usersRepository.findOne({ activationLink: link });
  }
  login() {}
  logOut() {}
}
