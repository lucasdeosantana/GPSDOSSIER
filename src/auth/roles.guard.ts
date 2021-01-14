import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("User")
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles)
    console.log(context.switchToHttp().getRequest().user)
    return true;
  }
}
