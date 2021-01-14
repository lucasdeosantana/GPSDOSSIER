import { Controller, Get, Request, Post, UseGuards, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from './roles.guard';
import { Roles } from '../decorators/roles.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private users: UsersService) {}

  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.body
    const user = await this.authService.validateUser(email, password)
    if(user){
      return this.authService.login(user)
    }
    throw new UnauthorizedException("User Or Password invalid!")
  }
  @Post('create')
  async create(@Request() req){
    return this.users.create(req.body.email, req.body.password)
  }
  @Roles("test")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}