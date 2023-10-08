import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { BookCommentModule } from './bookcomment/bookcomment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BooksModule,
    BookCommentModule,
  ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
