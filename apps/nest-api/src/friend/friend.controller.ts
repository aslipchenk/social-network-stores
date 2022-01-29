import { Body, Controller, Get, Param, Post, Res, Session, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendshipDto, FriendshipApproveDto, ListFriendShipsDto } from './friend.dto';
import { FriendshipEntity } from '../entities/friendship.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('createFriendship')
  createFriendship(@Body() createFriendship: CreateFriendshipDto, @Session() session): Promise<FriendshipEntity> {
    const requestUser = session.user.id;
    return this.friendService.createFriendship(createFriendship, requestUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('friendshipList')
  friendshipList(@Session() session): Promise<FriendshipEntity[]> {
    return this.friendService.friendshipList({ approveUser: session.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('friendshipListPoll')
  friendshipListPoll(@Session() session, ListFriendShipsDto, @Res() res): Promise<any> {
    return this.friendService.friendshipListPoll(session.user.id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('approveFriendship')
  approveFriendship(@Body() dto: FriendshipApproveDto): Promise<any> {
    return this.friendService.approveFriendship(dto);
  }
}
