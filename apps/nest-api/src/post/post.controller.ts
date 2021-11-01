import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param, UseGuards
} from '@nestjs/common';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto, CreatePostDto } from './post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async load(@Param('id') id: string): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return await this.postService.update(updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.postService.delete(id);
  }
}
