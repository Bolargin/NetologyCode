import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookComment, BookCommentDocument } from './schemas/bookcomment.schema';
import { Model } from 'mongoose';
import { BookCommentDto } from './interfaces/bookcomment.dto';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name) private BookCommentModel: Model<BookComment>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  public create(data: BookCommentDto): Promise<BookCommentDocument> {
    console.log('create' + JSON.stringify(data));
    return this.BookCommentModel.create(data);
  }

  public read(id: string): Promise<BookCommentDocument> {
    return this.BookCommentModel.findById({ _id: id }).exec();
  }

  public update(
    id: string,
    data: BookCommentDto,
  ): Promise<BookCommentDocument> {
    return this.BookCommentModel.findOneAndUpdate({ _id: id }, data).exec();
  }

  public delete(id: string): Promise<BookCommentDocument> {
    return this.BookCommentModel.findOneAndRemove({ _id: id }).exec();
  }

  public findAllBookComment(): Promise<BookCommentDocument[]> {
    const res = this.BookCommentModel.find().exec();
    console.log('findAllBookComment' + JSON.stringify(res));
    return res;
  }
}
