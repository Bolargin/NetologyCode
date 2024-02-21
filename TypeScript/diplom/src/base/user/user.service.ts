import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { IUserService, SearchUserParams } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(data: Partial<User>): Promise<User> {
    try {
      const user = new this.userModel(data);
      return await user.save();
    } catch (e) {
      if (e.code === 11000 && e.keyValue.email) {
        throw new BadRequestException(`E-mail ${e.keyValue.email} is busy`);
      }
    }
  }
  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
  async findAll(params: SearchUserParams): Promise<User[]> {
    const query: { [key: string]: any } = {};
    if (params.limit) {
      query.limit(params.limit);
    }
    if (params.offset) {
      query.skip(params.offset);
    }
    if (params.email) {
      query.email = { $regex: params.email, $options: 'i' };
    }
    if (params.name) {
      query.name = { $regex: params.name, $options: 'i' };
    }
    if (params.contactPhone) {
      query.contactPhone = { $regex: params.contactPhone, $options: 'i' };
    }
    return await this.userModel.find(query);
  }
}
