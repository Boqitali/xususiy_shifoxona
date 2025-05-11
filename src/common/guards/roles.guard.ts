import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../app.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //logika
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const roles = Array.isArray(req.person.role) ? req.person.role : [req.person.role];

    const permission = roles.some((role: any) =>
      requiredRoles.includes(role),
    );

    if (!permission) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan rol',
      });
    }
    return true;
  }
}