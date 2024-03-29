import { Module } from '@nestjs/common';
import { HotelModule } from 'src/base/hotel/hotel.module';
import { ReservationModule } from 'src/base/reservation/reservation.module';
import { ReservationApiController } from './reservation.controller';

@Module({
  imports: [ReservationModule, HotelModule],
  controllers: [ReservationApiController],
})
export class ReservationApiModule {}
