import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment {
  @Prop({ required: true })
  public bookid: number;

  @Prop()
  public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
