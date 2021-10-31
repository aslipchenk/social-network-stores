import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';
import { compare, hash } from 'bcrypt';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtErrorMessage } from '../config/constats';
import { Request } from 'express';


@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(userId: string) {
    const payload: TokenPayload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")}s`,
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    const accessCookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      refreshCookie,
      accessCookie,
      accessToken,
      refreshToken,
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
      refreshToken: hashedToken,
    });;
  }

  async verifyToken(request: Request, userId: string): Promise<boolean> {
    const accessToken = request.cookies?.Authentication;
    const refreshToken = request.cookies?.Refresh;
    let isAccessTokenValid: boolean | JwtVerifyOptions = false;
    let jwtError = null;
    try {
      isAccessTokenValid = await this.jwtService.verify(accessToken, { secret: this.configService.get("JWT_ACCESS_SECRET") });
    } catch (e) {
      jwtError = e.message;
    }

    if (isAccessTokenValid) {
      return true;
    }

    if (!isAccessTokenValid && jwtError !== JwtErrorMessage.expired) {
      throw new HttpException("Token is not valid, access denied", HttpStatus.FORBIDDEN)
    }

    const userToken = await this.tokenRepository.findOne({ user: userId });

    if (!userToken) {
      return false;
    }

    const isRefreshTokenMatching = await compare(refreshToken, userToken.refreshToken);
    const payload = { userId };
    const newAccessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
    });

    const accessCookie = `Authentication=${newAccessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
    if (isRefreshTokenMatching) {
      request.res.setHeader("Set-Cookie", accessCookie);
      return true;
    }

    return false;
  }

  async deleteToken(accessToken: string): Promise<any> {
    const data = this.jwtService.decode(accessToken)
    const userId = data?.userId;

    const tokenData = await this.tokenRepository.findOne({ user: userId });
    if (!tokenData) {
      return { operation: "success", warning: "Token does not exist or already deleted" };
    }
    await this.tokenRepository.delete({ user: userId });
    return {};
  }
}
