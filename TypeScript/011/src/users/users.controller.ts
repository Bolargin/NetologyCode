import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const user = await this.usersService.getUser({ username });
    if (user) return null;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
}
