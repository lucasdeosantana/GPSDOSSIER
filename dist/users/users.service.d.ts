import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(email: string, pass: string): Promise<{
        id: number;
        email: string;
    }>;
    findOne(email: string): Promise<import(".prisma/client").User>;
    findById(id: number): Promise<{
        token_remember: string;
        id: number;
        email: string;
    }>;
}
