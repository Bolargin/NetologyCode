import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './app.logging.interceptor';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    //if(Math.random() > 0.5){ throw new Error('Math.random > 0.5'); }
    return this.appService.getHello();
  }
}
