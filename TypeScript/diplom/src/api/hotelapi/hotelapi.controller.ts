import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  UseInterceptors,
  UploadedFiles,
  SerializeOptions,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import {
  CreateHotelRoomParams,
  SearchHotelParams,
  SearchRoomsParams,
  UpdateHotelParams,
  UpdateHotelRoomParams,
} from 'src/base/hotel/hotel.interface';
import { HotelService } from 'src/base/hotel/hotel.service';
import { MongooseClassSerializerInterceptor } from 'src/common/mongooseClassSerializer.interceptor';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ID } from 'src/common/interfaces/id.interface';
import { User } from 'src/base/user/user.schema';
import { HotelDto, HotelRoomDto } from 'src/common/dto/hotel.dto';
import { HotelRoomService } from 'src/base/hotel/hotelroom.service';
import { Params } from './hotelapi.interface';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/interfaces/role.interface';

@Controller()
@SerializeOptions({ strategy: 'excludeAll' })
export class HotelApiController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Get('common/hotel-rooms')
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelRoomDto))
  async getHotelRooms(
    @Query() query: SearchRoomsParams,
    @CurrentUser() user: User,
  ) {
    let { isEnabled } = query;
    if (!user || user?.role == 'client') {
      isEnabled = true;
    }
    return await this.hotelRoomService.search({
      ...query,
      isEnabled,
    });
  }

  @Get('common/hotel-rooms/:id')
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelRoomDto))
  async getHotelRoom(@Param('id') id: ID) {
    return await this.hotelRoomService.findById(id);
  }

  @Post('admin/hotels')
  @Roles([ROLE.Admin])
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelDto))
  async createHotel(@Body() data: Params) {
    return await this.hotelService.create(data);
  }

  @Get('admin/hotels')
  @Roles([ROLE.Admin])
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelDto))
  async getHotels(@Query() query: SearchHotelParams) {
    return await this.hotelService.search(query);
  }

  @Put('admin/hotels/:id')
  @Roles([ROLE.Admin])
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelDto))
  async updateHotel(@Param('id') id: ID, @Body() data: UpdateHotelParams) {
    return await this.hotelService.update(id, data);
  }

  @Post('admin/hotel-rooms')
  @Roles([ROLE.Admin])
  @UseInterceptors(FilesInterceptor('images', 16))
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelRoomDto))
  async createHotelRoom(
    @Body() data: CreateHotelRoomParams,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return await this.hotelRoomService.create({ ...data, images });
  }

  @Put('admin/hotel-rooms/:id')
  @Roles([ROLE.Admin])
  @UseInterceptors(FilesInterceptor('images', 16))
  @UseInterceptors(MongooseClassSerializerInterceptor(HotelRoomDto))
  async HotelRoomParams(
    @Param('id') roomId: ID,
    @Body() data: UpdateHotelRoomParams,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const images = [
      ...data.images,
      ...(files ? files.map((image) => image.path.replace('public', '')) : []),
    ];
    return await this.hotelRoomService.update(roomId, { ...data, images });
  }
}
