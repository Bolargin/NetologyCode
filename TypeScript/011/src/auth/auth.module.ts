import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/users.schema';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategy.local';
import { JwtStrategy } from './strategy.jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
