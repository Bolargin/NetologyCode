import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './interfaces/role.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userRole = this.reflector.get<Role[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    if (userRole && userRole.length) {
      if (!req.isAuthenticated()) {
        throw new UnauthorizedException();
      }
      const user = req.user;
      const routeAllowed = user && userRole.includes(user?.role);
      if (!routeAllowed) {
        throw new ForbiddenException(
          `You are a ${user.role}, but you should be an ${userRole}`,
        );
      }
    }
    return true;
  }
}
