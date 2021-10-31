import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtErrorMessage } from '../config/constats';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info.message === JwtErrorMessage.expired) {}
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
