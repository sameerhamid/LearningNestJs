import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from '../decrators/roles.decrator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtUser } from '../types/jwt-user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length <= 0) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user: JwtUser = ctx.getContext().req.user;
    const hasRequiredRole = roles.some((role) => user.role === role);
    return hasRequiredRole;
  }
}
