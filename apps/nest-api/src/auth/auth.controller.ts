import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, UserDto } from '../user/user.dto';
import { User } from '../entities/user.entity';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

//todo move to another file
interface ResetPasswordDtoIn {
  userId: string,
  password: string,
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('registration')
  async registration(@Body() registrateUserDto: UserDto, @Req() req: Request): Promise<User> {
    const requestUrl = req.protocol + '://' + req.get('host');
    const dtoOut = await this.authService.registration(registrateUserDto, requestUrl);
    req.res.setHeader('Set-Cookie', [dtoOut.refreshCookie]);

    return dtoOut;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request): Promise<any> {
    const dtoOut = await this.authService.login(loginUserDto);
    req.res.setHeader('Set-Cookie', [dtoOut.refreshCookie]);

    return { ...dtoOut };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const accessToken = req.cookies.Authentication;
    const cookies = await this.authService.logout(accessToken);
    req.res.setHeader('Set-Cookie', cookies);

    return { operation: 'success' };
  }

  @Post('sendResetPasswordMail')
  async sendResetPasswordMail(@Body('email') email: string): Promise<void> {
    return this.authService.sendResetPasswordMail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('resetPassword')
  async resetPassword(@Body() resetPasswordDtoIn: ResetPasswordDtoIn): Promise<void> {
    return await this.authService.resetPassword(resetPasswordDtoIn);
  }

  @UseGuards(JwtAuthGuard)
  @Get('activate/:link')
  async activate(@Param('link') link: string, @Res() res: Response): Promise<any> {
    await this.authService.activate(link);
    res.redirect('http://localhost:5000');

    return { operation: 'success' };
  }

  @Post('me')
  async authMe(@Req() req): Promise<any> {
    const refreshToken = req.cookies.Refresh;
    return this.authService.authMe(refreshToken);
  }

}
