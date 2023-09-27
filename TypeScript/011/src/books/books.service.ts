import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './interfaces/dto/book.create';
import { UpdateBookDto } from './interfaces/dto/book.update';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public getOne(id: string): Promise<BookDocument[]> {
    return this.BookModel.findOne({ _id: id });
  }

  public update(id: string, data: UpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(id: string): Promise<BookDocument> {
    return this.BookModel.findOneAndRemove({ _id: id });
  }
}
