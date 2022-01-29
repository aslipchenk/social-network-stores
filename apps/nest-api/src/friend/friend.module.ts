import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipEntity } from '../entities/friendship.entity';
import { TokenModule } from '../token/token.module';
import { FriendEntity } from '../entities/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendshipEntity, FriendEntity]),
    TokenModule,
  ],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
