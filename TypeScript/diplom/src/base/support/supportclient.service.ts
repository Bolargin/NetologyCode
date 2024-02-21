import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import {
  Message,
  SupportRequest,
  SupportRequestDocument,
} from './support.schema';
import {
  CreateSupportRequestDto,
  ISupportRequestClientService,
  MarkMessagesAsReadDto,
} from './support.interface';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createSupportRequest(
    //data: CreateSupportRequestDto & { user: ID },
    data: CreateSupportRequestDto,
  ): Promise<SupportRequestDocument> {
    const newMessage = await this.messageModel.create({
      author: data.user,
      sentAt: new Date(),
      text: data.text,
      readAt: null,
    });
    const request = await this.supportRequestModel.create({
      user: data.user,
      isActive: true,
      hasNewMessages: true,
      messages: [newMessage._id],
      createdAt: new Date(),
    });
    return await request.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const id = (
      await this.supportRequestModel.findById(params.supportRequest)
    ).get('messages');
    return await this.messageModel.updateMany(
      {
        _id: { $in: id },
        author: { $ne: params.user },
        sentAt: { $lte: params.createdBefore },
      },
      { $set: { readAt: new Date() } },
    );
  }

  async getUnreadCount(supportRequest: string): Promise<number> {
    const managers = await this.userModel.find({ role: 'manager' }).exec();
    return await this.messageModel
      .countDocuments({
        author: { $in: [managers] },
        supportRequest,
        isRead: false,
      })
      .exec();
  }
}
