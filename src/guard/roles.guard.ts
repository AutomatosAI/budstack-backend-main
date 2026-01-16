import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Role } from '@prisma/client';
  import { Observable } from 'rxjs';
  import { MESSAGES } from 'src/constants';
  
  export class RoleGuard implements CanActivate {
    constructor(private readonly role?: Role[]) {}
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<any> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user && this.role.includes(user.role)) {
        return true;
      } else {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
    }
  }