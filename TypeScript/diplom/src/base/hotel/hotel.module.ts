import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelRoom, HotelRoomSchema, HotelSchema } from './hotel.schema';
import { HotelRoomService } from './hotelroom.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelService, HotelRoomService],
  exports: [HotelService, HotelRoomService],
})
export class HotelModule {}
