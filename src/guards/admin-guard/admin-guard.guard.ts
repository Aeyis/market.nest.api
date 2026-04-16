import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestSession } from '../../interfaces/session.interface';
import { UserRole } from '../../enums/user-role.enum';

@Injectable()
export class AdminGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestSession = context.switchToHttp().getRequest();
    return request.session?.role === UserRole.Admin;
  }
}
