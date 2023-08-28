import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/books.interface';

interface CreateBookDto {
  title: Book['title'];
  description?: Book['description'];
  authors?: Book['authors'];
  favorite?: Book['favorite'];
  fileCover?: Book['fileCover'];
  fileName?: Book['fileName'];
}

@Injectable()
export class BooksService {
  constructor() {
    console.log('new BooksService');
  }

  private readonly books: Book[] = [];

  createBook(data: CreateBookDto): Book {
    const newBook = this.books.push(data);
    return this.books[newBook - 1];
  }
  getBooks(): Book[] {
    return this.books;
  }

  getBook(id: string): Book {
    return this.books[id];
  }

  updateBook(id: string, data: CreateBookDto): Book {
    this.books[id] = data;
    return this.books[id];
  }

  deleteBook(id: string): Book[] {
    delete this.books[id];
    return this.books;
  }
}
