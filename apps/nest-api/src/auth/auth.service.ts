import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { LoginUserDto, UserDto } from '../user/user.dto';
import { compare, hash } from 'bcrypt';
import { PostgresErrorCode } from '../config/constats';
import * as uuid from 'uuid';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { URL } from 'url';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly connection: Connection
  ) {}

  async registration(
    registrateUserDto: UserDto,
    requestUrl: string
  ): Promise<any> {
    const email: string = registrateUserDto.email;
    const candidate = await this.usersRepository.findOne({
      email,
    });
    if (candidate)
      throw new HttpException(
        'User with current email already exist',
        HttpStatus.BAD_REQUEST
      );

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let userDtoOut = null;
    const activationLink: string = uuid.v4();
    const password = await hash(registrateUserDto.password, 10);

    try {
      userDtoOut = await queryRunner.manager.save(User, {
        ...registrateUserDto,
        activationLink,
        password,
      });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email is already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        `Save user using userRepository save failed ${e?.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const activationUrl = new URL(requestUrl);
    activationUrl.pathname = '/auth/activate/' + activationLink;
    try {
      await this.mailService.sendActivationMail(
        email,
        activationUrl.toString()
      );
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }

    await queryRunner.commitTransaction();
    await queryRunner.release();

    const tokens = this.tokenService.generateTokens(userDtoOut.id);
    await this.tokenService.saveToken(userDtoOut.id, tokens.refreshToken);
    userDtoOut.password = undefined;

    return { ...userDtoOut, ...tokens };
  }

  async activate(link: string) {
    const user = await this.usersRepository.findOne({ activationLink: link });
    if (!user) {
      throw new HttpException(
        `User with activation link ${link} was not found`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.usersRepository.save({
      ...user,
      status: 'active',
      activationLink: null,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      email: loginUserDto.email,
    });
    if (!user) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST
      );
    }
    let passwordEquals: boolean = await compare(
      loginUserDto.password,
      user.password
    );
    let { status } = user;

    if (!passwordEquals && user.temporaryPassword) {
      status = 'loginByTemporaryPassword';
      passwordEquals = await compare(
        loginUserDto.password,
        user.temporaryPassword
      );
    }

    if (!passwordEquals) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST
      );
    }

    const tokens = this.tokenService.generateTokens(user.id);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    const dtoOut = { ...tokens, ...user, status };
    return { ...dtoOut };
  }

  async logout(accessToken: string): Promise<Array<string>> {
    await this.tokenService.deleteToken(accessToken);
    return AuthService.getCookiesForLogOut();
  }

  async authMe(refreshToken: string, req: any) {
    let payload = null;
    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch (e) {
      throw new HttpException(
        'User is not authenticated',
        HttpStatus.UNAUTHORIZED
      );
    }

    let user = null;
    try {
      user = await this.usersRepository.findOne({ id: payload.userId });
    } catch (e) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    req.session.user = user;

    const token = await this.tokenService.generateAccessToken({
      userId: payload.userId,
    });
    return { token, ...payload, ...user };
  }

  async sendResetPasswordMail(email: string): Promise<void> {
    const user = this.usersRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        'User with current email does not exits',
        HttpStatus.BAD_REQUEST
      );
    }

    const temporaryPassword = randomBytes(8).toString('hex');
    const hashedTemporaryPassword = await hash(temporaryPassword, 10);

    await this.mailService.sendResetPasswordEmail(email, temporaryPassword);
    await this.usersRepository.update(
      { email },
      { temporaryPassword: hashedTemporaryPassword }
    );
  }

  async resetPassword(dtoIn: any): Promise<void> {
    const user = this.usersRepository.findOne({ id: dtoIn.userId });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const newPassword = await hash(dtoIn.password, 10);
    await this.usersRepository.update(
      { id: dtoIn.userId },
      { password: newPassword, temporaryPassword: null }
    );
  }

  private static getCookiesForLogOut(): Array<string> {
    return ['Refresh=; HttpOnly; Path=/; Max-Age=0'];
  }
}
