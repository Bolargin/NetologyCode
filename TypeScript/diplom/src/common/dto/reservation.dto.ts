import { Expose, Transform, Type } from 'class-transformer';
import { ReservHotelDto, ReservHotelRoomDto } from './hotel.dto';

export class ReservationDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose({ name: 'startDate' })
  @Transform(({ value }) => value.toISOString())
  dateStart: string;

  @Expose({ name: 'endDate' })
  @Transform(({ value }) => value.toISOString())
  dateEnd: string;

  @Expose({ name: 'hotelRoom' })
  @Type(() => ReservHotelRoomDto)
  roomId: ReservHotelRoomDto;

  @Expose({ name: 'hotel' })
  @Type(() => ReservHotelDto)
  hotelId: ReservHotelDto;

  constructor(partial: Partial<ReservationDto>) {
    Object.assign(this, partial);
  }
}
