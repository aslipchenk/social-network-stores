import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';
import { hash } from 'bcrypt';
import { Request } from 'express';


@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  generateTokens(userId: string) {
    const payload: TokenPayload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
      secret: this.configService.get('JWT_REFRESH_SECRET')
    });

    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      refreshCookie,
      accessToken,
      refreshToken
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const hashedToken = await hash(refreshToken, 10);
    const token = await this.tokenRepository.findOne({ user: userId });

    if (token) {
      return await this.tokenRepository.update({ user: userId }, { refreshToken: hashedToken });
    }
    return await this.tokenRepository.save({
      user: userId,
      refreshToken: hashedToken
    });
    ;
  }

  async verifyToken(request: Request): Promise<boolean> {
    const accessToken = request.headers.authorization.split(' ')[1];
    let isAccessTokenValid: boolean | JwtVerifyOptions = false;
    try {
      isAccessTokenValid = this.jwtService.verify(accessToken, { secret: this.configService.get('JWT_ACCESS_SECRET') });
    } catch (e) {
      return false;
    }

    if (isAccessTokenValid) {
      return true;
    }
    return false;
  }

  async verifyRefreshToken(refreshToken: string) {
    this.jwtService.verify(refreshToken, { secret: this.configService.get('JWT_REFRESH_SECRET') });

    return this.jwtService.decode(refreshToken);
    ;
  }

  async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
  }

  async deleteToken(accessToken: string): Promise<any> {
    const data = this.jwtService.decode(accessToken);
    const userId = data?.userId;

    const tokenData = await this.tokenRepository.findOne({ user: userId });
    if (!tokenData) {
      return { operation: 'success', warning: 'Token does not exist or already deleted' };
    }
    await this.tokenRepository.delete({ user: userId });
    return {};
  }
}
