import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  getHello(): string {
    return (
      'Добро пожаловать в библиотеку.' + this.usersService.findByEmail('7777')
    );
  }
}
