import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        id: number;
        email: string;
        token_remember: string;
    }>;
    login(user: Omit<User, "password">): Promise<{
        access_token: string;
    }>;
}
