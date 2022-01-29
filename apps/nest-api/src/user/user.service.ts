import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto, UserDto } from './user.dto';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(user: UserDto): Promise<User> {
    let userDtoOut = null;
    try {
      userDtoOut = await this.usersRepository.save(user);
    } catch (e) {
      throw new HttpException(
        'Save user using userRepository save failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return userDtoOut;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, ...restDtoIn } = updateUserDto;
    const user = await this.usersRepository.findOne(id);
    if (!user)
      throw new HttpException(
        'Update user failed, user does not exist',
        HttpStatus.BAD_REQUEST
      );

    return await this.usersRepository.save({ ...user, ...restDtoIn });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findImageNameByUserId(id: string): Observable<string> {
    return from(this.usersRepository.findOne({ id })).pipe(
      map((user: User) => {
        return user.avatarId;
      })
    );
  }
  updateUserImageById(id: string, imagePath: string): Observable<UpdateResult> {
    return from(
      this.usersRepository.update(id, { avatarId: imagePath.split('.')[0] })
    );
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.update(id, { status: 'deleted' });
  }
}
