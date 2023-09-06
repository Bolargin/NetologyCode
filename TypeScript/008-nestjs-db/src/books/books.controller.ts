import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BookDocument } from './schemas/book.schema';
import { BooksService } from './books.service';
import { IParamId } from './interfaces/param-id';
import { CreateBookDto } from './interfaces/dto/book.create';
import { UpdateBookDto } from './interfaces/dto/book.update';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  public delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.bookService.delete(id);
  }
}
