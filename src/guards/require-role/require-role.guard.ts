import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../enums/user-role.enum';
import { RequestSession } from '../../interfaces/session.interface';

@Injectable()
export class RequireRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get<UserRole[]>(
      'require-role',
      context.getHandler(),
    );

    const req: RequestSession = context.switchToHttp().getRequest();

    // user pas connecté
    if (!req.session) {
      return false;
    }

    // user connecté, aucun rôle requis
    if (!roles || roles.length === 0) {
      return true;
    }

    return false;
  }
}
