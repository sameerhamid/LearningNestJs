import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '@prisma/client';
import { ROLES_KEY } from 'src/auth/decrators/roles.decrator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requredRoles>>', requiredRoles);
    if (!requiredRoles || requiredRoles.length <= 0) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;

    return requiredRoles.some((role) => user.role === role);
  }
}
