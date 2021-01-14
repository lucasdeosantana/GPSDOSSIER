import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private users;
    constructor(authService: AuthService, users: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    create(req: any): Promise<{
        id: number;
        email: string;
    }>;
    getProfile(req: any): any;
}
