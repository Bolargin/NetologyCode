import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<User> {
    console.log(
      'create ' +
        email +
        ' - ' +
        password +
        ' - ' +
        firstName +
        ' - ' +
        lastName,
    );
    const user = await this.usersService.getUser({ email });
    if (user) return null;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      email,
      hashedPassword,
      firstName,
      lastName,
    );
    return result;
  }
}
