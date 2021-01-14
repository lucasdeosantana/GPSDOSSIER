import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private users;
    constructor(users: UsersService);
    validate({ id }: {
        id: any;
    }): Promise<{
        id: number;
        email: string;
        token_remember: string;
    }>;
}
export {};
