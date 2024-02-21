import { ID } from 'src/common/interfaces/id.interface';
import { Hotel, HotelRoom } from './hotel.schema';
//Hotel
export interface SearchHotelParams {
  limit?: number;
  offset?: number;
  title?: string;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
}

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}
//HotelRoom
export interface SearchRoomsParams {
  limit?: number;
  offset?: number;
  hotel: ID;
  isEnabled?: boolean;
}

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}

export interface CreateHotelRoomParams {
  description: string;
  hotelId: string;
  images: Express.Multer.File[];
}

export interface UpdateHotelRoomParams {
  description: string;
  hotelId: string;
  images: string[];
}
