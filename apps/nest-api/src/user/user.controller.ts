import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../entities/user.entity';
import { UserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() createUserDto: UserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('list')
  async list() {
    return this.userService.findAll();
  }

  @Get(':id')
  async load(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(updateUserDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
