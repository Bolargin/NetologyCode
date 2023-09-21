import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { BookDocument } from './schemas/book.schema';
import { BooksService } from './books.service';
import { IParamId } from './interfaces/param-id';
import { CreateBookDto } from './interfaces/dto/book.create';
import { UpdateBookDto } from './interfaces/dto/book.update';
import { ValidationPipe } from 'src/books/validation/validation.pipe';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { createSchema } from './validation/joi.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @UsePipes(new JoiValidationPipe(createSchema))
  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get(':id')
  public getOne(
    @Param('id', ValidationPipe) { id }: IParamId,
  ): Promise<BookDocument[]> {
    return this.bookService.getOne(id);
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
