import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import {
  Message,
  MessageSchema,
  SupportRequest,
  SupportRequestSchema,
} from './support.schema';
import { SupportRequestService } from './supportbase.service';
import { SupportRequestClientService } from './supportclient.service';
import { SupportRequestEmployeeService } from './supportemployee.service';
import { WebsocketGateway } from 'src/websocet/websocket.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
    UserService,
    WebsocketGateway,
  ],
  exports: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
  ],
})
export class SupportRequestModule {}
