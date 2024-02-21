import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { Hotel, HotelRoom } from '../hotel/hotel.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false,
  })
  userId: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
    unique: false,
  })
  hotelId: Hotel;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'HotelRoom',
    required: true,
    unique: false,
  })
  roomId: HotelRoom;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: true,
    unique: false,
  })
  dateStart: Date;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: true,
    unique: false,
  })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
