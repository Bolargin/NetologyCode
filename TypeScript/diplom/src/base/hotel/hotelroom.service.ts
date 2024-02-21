import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SearchRoomsParams,
  CreateHotelRoomParams,
  UpdateHotelRoomParams,
} from './hotel.interface';
import { HotelRoom, HotelRoomDocument } from './hotel.schema';
import { ID } from 'src/common/interfaces/id.interface';

@Injectable()
export class HotelRoomService {
  constructor(@InjectModel(HotelRoom.name) private model: Model<HotelRoom>) {}

  async create(data: CreateHotelRoomParams): Promise<HotelRoomDocument> {
    const { hotelId, description, images } = data;
    const hotelRoom = await new this.model({
      description,
      images: images.map((image) => image.path.replace('public', '')),
      hotel: hotelId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).save();

    return await hotelRoom.populate('hotel');
  }

  async findById(id: ID): Promise<HotelRoomDocument> {
    return await this.model.findById(id).populate('hotel');
  }

  async search({
    limit,
    offset,
    hotel,
    isEnabled,
  }: SearchRoomsParams): Promise<HotelRoomDocument[]> {
    const query = this.model.find({ hotel, isEnabled });
    if (offset) {
      query.skip(offset);
    }
    if (limit) {
      query.limit(limit);
    }
    const hotelRooms = await query.populate('hotel').exec();
    return hotelRooms;
  }

  async update(
    id: ID,
    data: UpdateHotelRoomParams,
  ): Promise<HotelRoomDocument> {
    const hotelRoom = await this.model.findByIdAndUpdate(id, data);
    return await hotelRoom.populate('hotel');
  }
}
