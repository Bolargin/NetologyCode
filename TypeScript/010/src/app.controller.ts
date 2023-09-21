import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './app.logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //if(Math.random() > 0.5){ throw new Error('Math.random > 0.5'); }
    return this.appService.getHello();
  }
}
