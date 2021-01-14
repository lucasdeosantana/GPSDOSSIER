import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, pass: string){
    const user = await this.usersService.findOne(email);
    if (user) {
      const passIsValid = await compare(pass, user.password)
      if(passIsValid){
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
  async login(user:Omit<User, "password">) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}