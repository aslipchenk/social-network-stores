import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFriendshipDto, FriendshipApproveDto, ListFriendShipsDto } from './friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendshipEntity } from '../entities/friendship.entity';
import { FriendEntity } from '../entities/friend.entity';

const events = require('events');
const emitter = new events.EventEmitter();
const FRIENDSHIP_REQUEST = 'friendshipRequest';

@Injectable()
export class FriendService {
  constructor(@InjectRepository(FriendshipEntity)
              private friendshipRepository: Repository<FriendshipEntity>,
              @InjectRepository(FriendEntity) private friendRepository: Repository<FriendEntity>) {
  }

  async createFriendship(createFriendshipDto: CreateFriendshipDto, requestUser: string): Promise<FriendshipEntity> {
    if (createFriendshipDto.approveUser === requestUser) {
      throw new HttpException('User should be not the same', HttpStatus.BAD_REQUEST);
    }

    const friendship = await this.friendshipRepository.save({ ...createFriendshipDto, requestUser });
    emitter.emit(FRIENDSHIP_REQUEST + createFriendshipDto.approveUser, friendship);
    return friendship;
  }

  async friendshipList(dto: ListFriendShipsDto): Promise<FriendshipEntity[]> {
    return await this.friendshipRepository.query(`SELECT * FROM public.friendship
        JOIN public.user
        ON "requestUser"=public.user.id
        WHERE "approveUser"='${dto.approveUser}'`);
  }

  async approveFriendship(dto: FriendshipApproveDto): Promise<any> {
  }

  async friendshipListPoll(approveUser: string, res: any) {
    emitter.once(FRIENDSHIP_REQUEST + approveUser, (newFriendship) => {
      res.send(newFriendship);
    });
  }
}
