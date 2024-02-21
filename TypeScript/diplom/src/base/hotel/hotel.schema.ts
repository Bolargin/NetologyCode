import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HotelDocument = Hotel & Document;
export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class Hotel {
  @Prop({ required: true, unique: true })
  public title: string;

  @Prop({ required: false, unique: false })
  public description: string;

  @Prop({ required: true, unique: false })
  public createdAt: Date;

  @Prop({ required: true, unique: false })
  public updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

@Schema()
export class HotelRoom {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel: Hotel;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
