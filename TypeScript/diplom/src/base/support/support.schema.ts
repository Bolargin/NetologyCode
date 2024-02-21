import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type MessageDocument = Message & Document;
export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class Message {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  author: User;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ required: false })
  readAt: Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);

@Schema()
export class SupportRequest {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({
    type: MongooseSchema.Types.Array,
    ref: Message.name,
    required: false,
  })
  messages: Message[];

  @Prop({ required: false })
  isActive: boolean;
}
export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
