import { ID } from 'src/common/interfaces/id.interface';
import { Reservation } from './reservation.schema';

export interface AddReservation {
  userId: ID;
  hotelId: ID;
  roomId: ID;
  dateStart: Date;
  dateEnd: Date;
}

export interface ReservationSearchOptions {
  userId: ID;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IReservation {
  addReservation(data: AddReservation): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
