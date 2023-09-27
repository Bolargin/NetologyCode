import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from './dto/user.create';
import { GetUserDto } from './dto/user.get';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async createUser(data: CreateUserDto): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email: data.email }).exec();
    if (user) {
      throw new HttpException('email занят', HttpStatus.NOT_FOUND);
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(data.password, salt);

    const book = new this.UserModel({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    return book.save();
  }

  public async getUser(data: GetUserDto): Promise<UserDocument> {
    console.log('getUser');
    const user = await this.UserModel.findOne({ email: data.email }).exec();
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const areEqual = await compare(data.password, user.password);
    if (!areEqual) {
      throw new HttpException('Пароль не верен', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  public async findByEmail({ email }: any): Promise<User | undefined> {
    return await this.UserModel.findOne({ email: email });
  }
}
