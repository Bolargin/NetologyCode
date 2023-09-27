import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, BooksController, AuthController],
  providers: [AppService],
})
export class AppModule {}
