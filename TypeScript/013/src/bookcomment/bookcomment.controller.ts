import { Controller, Get } from '@nestjs/common';
import { BookCommentService } from './bookcomment.service';

@Controller('BC')
export class BookCommentController {
  constructor(private readonly BCService: BookCommentService) {}
  @Get()
  getHello(): string {
    return this.BCService.getHello();
  }
}
