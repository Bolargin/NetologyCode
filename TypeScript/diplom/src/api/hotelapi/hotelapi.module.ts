import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { HotelApiController } from './hotelapi.controller';
import { HotelModule } from 'src/base/hotel/hotel.module';

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join('public', 'upload'),
        filename: editFileName,
      }),
    }),
    HotelModule,
  ],
  controllers: [HotelApiController],
})
export class HotelApiModule {}
