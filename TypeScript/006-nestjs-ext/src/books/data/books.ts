import { Book } from '../interfaces/books.interface';

export class Books implements Book {
  title: string;
  description?: string;
  authors?: string;
  favorite: string;
  fileCover?: string;
  fileName?: string;
  constructor(
    title?: string,
    description?: string,
    authors?: string,
    favorite?: string,
    fileCover?: string,
    fileName?: string,
  ) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}
