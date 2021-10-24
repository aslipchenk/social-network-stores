import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto, CreatePostDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Get('list')
  async list() {
    return this.postService.findAll();
  }

  @Get(':id')
  async load(@Param('id') id: string): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  @Put('update')
  async update(@Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return await this.postService.update(updatePostDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.postService.delete(id);
  }
}
