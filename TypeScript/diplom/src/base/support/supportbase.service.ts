import { Model } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, SupportRequest } from './support.schema';
import { WebsocketGateway } from 'src/websocet/websocket.gateway';
import {
  ISupportRequestService,
  GetChatListParams,
  SendMessageDto,
} from './support.interface';
import { ID } from 'src/common/interfaces/id.interface';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    private readonly websocketService: WebsocketGateway,
  ) {}

  async findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequest[]> {
    const queryParams = {};
    if (params.user) {
      queryParams['user'] = params.user;
    }
    if (params.isActive) {
      queryParams['isActive'] = params.isActive;
    }
    const query = this.supportRequestModel.find(queryParams);
    if (params.offset) {
      query.skip(params.offset);
    }
    if (params.limit) {
      query.limit(params.limit);
    }
    return await query.populate('user').exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const message = new this.messageModel({
      ...data,
      sentAt: new Date(),
    });
    const savedMessage = await message.save();
    await this.supportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: { messages: message._id },
    });
    this.websocketService.addEvent('message', savedMessage);
    return await savedMessage.populate('author');
  }

  async getMessages(supportRequest: string): Promise<Message[]> {
    const messages = await this.supportRequestModel
      .findById(supportRequest)
      .populate({
        path: 'messages',
        populate: {
          path: 'author',
        },
      });
    return messages.get('messages') as Message[];
  }

  async subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ) {
    const supportRequest = null;
    const message = null;
    handler(supportRequest, message);
  }

  async verificatAuthor(id: ID, userid: ID): Promise<boolean> {
    const autor = await this.supportRequestModel.findById(id);
    if (autor.get('user').toString() != userid.toString()) {
      throw new ForbiddenException('Wrong author');
    }
    return true;
  }
}
