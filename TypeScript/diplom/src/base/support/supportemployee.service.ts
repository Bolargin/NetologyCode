import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Message, SupportRequest } from './support.schema';
import {
  ISupportRequestEmployeeService,
  MarkMessagesAsReadDto,
} from './support.interface';
import { ROLE } from 'src/common/interfaces/role.interface';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const id = (
      await this.supportRequestModel.findById(params.supportRequest)
    ).get('messages');
    const managerUsers = await this.userModel
      .find({ role: ROLE.Managеr })
      .select('_id');
    return await this.messageModel
      .updateMany(
        {
          _id: { $in: id },
          author: { $nin: managerUsers },
          sentAt: { $lte: params.createdBefore },
        },
        { $set: { readAt: new Date() } },
      )
      .exec();
  }

  async getUnreadCount(supportRequest: string): Promise<number> {
    const user = await this.supportRequestModel
      .findById(supportRequest)
      .get('user');
    return await this.messageModel
      .countDocuments({
        supportRequest,
        user,
        isRead: false,
      })
      .exec();
  }

  async closeRequest(supportRequestId: string): Promise<void> {
    await this.supportRequestModel.updateOne(
      {
        _id: supportRequestId,
      },
      {
        isActive: false,
      },
    );
  }
}
