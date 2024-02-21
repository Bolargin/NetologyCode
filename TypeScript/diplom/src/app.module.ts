import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './base/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard';
import { HotelApiModule } from './api/hotelapi/hotelapi.module';
import { ReservationApiModule } from './api/reservation/reservation.module';
import { SupportRequestApiModule } from './api/supportapi/supportapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    UserModule,
    AuthModule,
    HotelApiModule,
    ReservationApiModule,
    SupportRequestApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
