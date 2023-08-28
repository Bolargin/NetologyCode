import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
//import { Book } from './interfaces/books.interface';
import { Books } from './data/books';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('create')
  createBook() {
    const book = new Books(
      'Название 1',
      'Описание 1',
      'Автор 1',
      'Нет',
      '001.jpg',
      '001.txt',
    );
    return this.booksService.createBook(book);
  }

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param() params: any) {
    return this.booksService.getBook(params.id);
  }

  @Get('update/:id')
  updateBook(@Param() params: any) {
    const book = new Books(
      'Название 2',
      'Описание 2',
      'Автор 2',
      'Да',
      '002.jpg',
      '002.txt',
    );
    return this.booksService.updateBook(params.id, book);
  }

  @Get('delete/:id')
  deleteBook(@Param() params: any) {
    return this.booksService.deleteBook(params.id);
  }
}
