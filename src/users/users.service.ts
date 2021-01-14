import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt'


@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}
    
    async create(email:string, pass:string){
        const hashPassword = await hash(pass, 13)
        const user = await this.prisma.user.create({data:{email, password:hashPassword}})
        const {password, token_remember ,...securityUser } = user
        return securityUser
    }

    async findOne(email: string){
        return this.prisma.user.findUnique({where:{email}})
    }

    async findById(id:number){
        return this.prisma.user.findUnique({
            where:{id},
            select:{
                email:true,
                id:true,
                password:false,
                token_remember:true
            }
        })
    }
}
