import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Book } from './schemas/book.schema';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './validation/http.exception.filter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [BooksService],
})
export class BooksModule {}
