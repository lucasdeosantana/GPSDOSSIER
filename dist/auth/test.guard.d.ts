import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class GuardTest implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
