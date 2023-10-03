import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './interfaces/dto/book.create';
import { UpdateBookDto } from './interfaces/dto/book.update';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

  public create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }
  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public update(id: string, data: UpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(id: string): Promise<BookDocument> {
    return this.BookModel.findOneAndRemove({ _id: id });
  }
}
