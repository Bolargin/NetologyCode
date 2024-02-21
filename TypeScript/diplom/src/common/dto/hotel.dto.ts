import { Expose, Transform, Type } from 'class-transformer';

export class HotelDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  constructor(partial: Partial<HotelDto>) {
    Object.assign(this, partial);
  }
}

class BaseHotelRoomDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose()
  description: string;

  @Expose()
  images: string[];

  constructor(partial: Partial<BaseHotelRoomDto>) {
    Object.assign(this, partial);
  }
}

export class HotelRoomDto extends BaseHotelRoomDto {
  @Expose()
  @Type(() => HotelDto)
  hotel?: HotelDto;
}

export class UpdateHotelRoomDto extends HotelRoomDto {
  @Expose()
  isEnabled: boolean;
}

export class ReservHotelDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  constructor(partial: Partial<ReservHotelDto>) {
    Object.assign(this, partial);
  }
}

export class ReservHotelRoomDto {
  @Expose()
  description: string;

  @Expose()
  images: string[];

  constructor(partial: Partial<ReservHotelRoomDto>) {
    Object.assign(this, partial);
  }
}
