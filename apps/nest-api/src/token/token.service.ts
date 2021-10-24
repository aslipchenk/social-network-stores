import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';

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
      expiresIn: '30m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokenRepository.save(tokenData);
    }
    const token = await this.tokenRepository.create({
      user: userId,
      refreshToken,
    });
    return token;
  }
}
