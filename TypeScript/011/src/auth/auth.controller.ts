import {
  Controller,
  Post,
  Body,
  //Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.create';
import { GetUserDto } from '../users/dto/user.get';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from './strategies/jwt.auth.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('signup')
  public create(@Body() body: CreateUserDto): Promise<any> {
    console.log('create');
    const user = this.usersService.createUser(body);
    return this.authService.createToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signin')
  public get(@Body() body: GetUserDto): Promise<any> {
    return this.usersService.getUser(body);
  }
}
