import { Controller, Post, Body, Get, Put, Param, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';
import { User } from '../entities/user.entity';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() registrateUserDto: UserDto, @Req() req: Request): Promise<User> {
    const requestUrl = req.protocol + "://" + req.get("host")
    return await this.authService.registration(registrateUserDto, requestUrl);
  }

  @Post('login')
  async login() {}

  @Post('logout')
  async logout() {}

  @Get('refresh')
  async refresh() {}

  @Get('activate/:link')
  async activate(@Param('link') link: string, @Res() res: Response): Promise<any> {
    await this.authService.activate(link);
    res.redirect("http://localhost:5000");
    return { operation: "success" }
  }

  @Put('reset')
  async reset() {}
}
