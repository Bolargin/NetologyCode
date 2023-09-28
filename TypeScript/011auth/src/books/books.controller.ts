import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { BookDocument } from './schemas/book.schema';
import { BooksService } from './books.service';
import { IParamId } from './interfaces/param-id';
import { CreateBookDto } from './interfaces/dto/book.create';
import { UpdateBookDto } from './interfaces/dto/book.update';
import { ValidationPipe } from '../books/validation/validation.pipe';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { createSchema } from './validation/joi.schema';
import { JwtAuthGuard } from '../auth/guard.jwt';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @UsePipes(new JoiValidationPipe(createSchema))
  @UseGuards(JwtAuthGuard)
  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getOne(
    @Param('id', ValidationPipe) { id }: IParamId,
  ): Promise<BookDocument[]> {
    return this.bookService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.bookService.delete(id);
  }
}
