import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ReservationDto } from 'src/common/dto/reservation.dto';
import { MongooseClassSerializerInterceptor } from 'src/common/mongooseClassSerializer.interceptor';
import { HotelDocument } from 'src/base/hotel/hotel.schema';
import { HotelRoomService } from 'src/base/hotel/hotelroom.service';
import { ReservationService } from 'src/base/reservation/reservation.service';
import { ReservationParams } from './reservation.interface';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/interfaces/role.interface';

@Controller()
@SerializeOptions({ strategy: 'excludeAll' })
export class ReservationApiController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Post('client/reservations')
  @Roles([ROLE.Client])
  @UseInterceptors(MongooseClassSerializerInterceptor(ReservationDto))
  async createClientReservation(
    @CurrentUser() user,
    @Body() data: ReservationParams,
  ) {
    const { startDate, endDate } = data;
    const hotelRoom = await this.hotelRoomService.findById(data.hotelRoom);
    return await this.reservationService.addReservation({
      userId: user._id,
      hotelId: (hotelRoom.hotel as HotelDocument)._id,
      roomId: hotelRoom._id,
      dateStart: new Date(startDate),
      dateEnd: new Date(endDate),
    });
  }

  @Get('client/reservations')
  @Roles([ROLE.Client])
  @UseInterceptors(MongooseClassSerializerInterceptor(ReservationDto))
  async getClientReservations(@CurrentUser() user) {
    return await this.reservationService.getReservations({ userId: user._id });
  }

  @Delete('client/reservations/:id')
  @Roles([ROLE.Client])
  async deleteClientReservation(
    @Param('id') id: string,
    @CurrentUser() user,
  ): Promise<void> {
    const reservationUser =
      await this.reservationService.getReservationUserId(id);
    if (reservationUser != user._id) {
      throw new ForbiddenException('This reserve not for current user');
    }
    await this.reservationService.removeReservation(id);
  }

  @Get('manager/reservations/:userId')
  @Roles([ROLE.Managеr])
  @UseInterceptors(MongooseClassSerializerInterceptor(ReservationDto))
  async getManagerClientReservations(@Param('userId') userId: string) {
    return await this.reservationService.getReservations({ userId });
  }

  @Delete('manager/reservations/:id')
  @Roles([ROLE.Managеr])
  async deleteManagerClientReservation(@Param('id') id: string): Promise<void> {
    await this.reservationService.removeReservation(id);
  }
}
