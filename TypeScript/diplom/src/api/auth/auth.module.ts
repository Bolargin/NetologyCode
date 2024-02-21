import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/base/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './passport/local.stategy';
import { SessionSerializer } from './passport/session.serializer';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, SessionSerializer],
})
export class AuthModule {}
