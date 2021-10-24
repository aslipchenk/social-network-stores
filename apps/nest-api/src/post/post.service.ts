import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UpdatePostDto, CreatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  async create(post: CreatePostDto): Promise<PostEntity> {
    let postDtoOut: PostEntity | null = null;
    try {
      postDtoOut = await this.postsRepository.save(post);
    } catch (e) {
      throw new HttpException(
        'Save post using postRepository save failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return postDtoOut;
  }

  async update(updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { id, ...restDtoIn } = updatePostDto;
    const post = await this.postsRepository.findOne(id);
    if (!post)
      throw new HttpException(
        'Update post failed, post does not exist',
        HttpStatus.BAD_REQUEST,
      );

    return await this.postsRepository.save({ ...post, ...restDtoIn });
  }

  findOne(id: string): Promise<PostEntity> {
    return this.postsRepository.findOne(id);
  }
}
