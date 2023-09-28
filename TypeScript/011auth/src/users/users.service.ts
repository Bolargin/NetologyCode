import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    console.log(
      'createUser ' +
        email +
        ' - ' +
        password +
        ' - ' +
        firstName +
        ' - ' +
        lastName,
    );
    return this.userModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  }
  async getUser(query: object): Promise<User> {
    console.log('getUser ' + JSON.stringify(query));
    return this.userModel.findOne(query);
  }
}
