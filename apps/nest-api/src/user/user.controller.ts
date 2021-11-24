import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put, UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async load(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
