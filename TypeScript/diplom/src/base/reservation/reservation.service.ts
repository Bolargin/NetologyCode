import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import {
  IReservation,
  AddReservation,
  ReservationSearchOptions,
} from './reservation.interface';
import { User } from '../user/user.schema';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(data: AddReservation): Promise<ReservationDocument> {
    const { hotelId, roomId, dateStart, dateEnd } = data;
    const room = await this.reservationModel.find({ roomId });
    if (!room) {
      throw new BadRequestException('This is a non-existent room');
    }
    const countDocuments = await this.reservationModel.countDocuments({
      roomId,
      hotelId,
      dateStart: new Date(dateStart).toISOString(),
      dateEnd: new Date(dateEnd).toISOString(),
    });
    if (countDocuments === 0) {
      const reservation = new this.reservationModel(data);
      return await (await reservation.save()).populate(['hotelId', 'roomId']);
    } else {
      throw new BadRequestException('This room is not available');
    }
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id);
  }

  async getReservations(
    filter: ReservationSearchOptions,
  ): Promise<ReservationDocument[]> {
    return await this.reservationModel
      .find(filter)
      .populate(['hotelId', 'roomId'])
      .exec();
  }

  async getReservationUserId(id: string): Promise<User> {
    const reserv = await this.reservationModel.findById(id);
    if (!reserv) {
      throw new BadRequestException('There is no reservation with this ID.');
    }
    return reserv.userId;
  }
}
