import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class DoctorGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
 
    if (req.user.role != "doctor" ) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan foydalanuvchi',
      });
    }
      
    
    return true;
  }
}


