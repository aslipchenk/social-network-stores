import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() registrateUserDto: UserDto): Promise<User> {
    return await this.authService.registration(registrateUserDto);
  }

  @Post('login')
  async login() {}

  @Post('logout')
  async logout() {}

  @Get('refresh')
  async refresh() {}

  @Put('activate/:link')
  async activate(@Param('link') link: string): Promise<void> {
    return await this.authService.activate(link);
  }

  @Put('reset')
  async reset() {}
}
