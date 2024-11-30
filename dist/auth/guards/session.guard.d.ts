import { ExecutionContext } from '@nestjs/common';
declare const SessionGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class SessionGuard extends SessionGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
export {};
