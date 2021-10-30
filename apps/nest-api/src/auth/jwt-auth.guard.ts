import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService ) {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not authenticated" })
      }
      console.log(this);
      console.log(JwtService);
      const user = this.jwtService.verify(token);
      console.log(bearer, token);
      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: "User is not authenticated" });
    }
  }
}
