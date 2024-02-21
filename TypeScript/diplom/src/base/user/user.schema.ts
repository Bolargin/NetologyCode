import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/interfaces/role.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true, unique: false })
  public passwordHash: string;

  @Prop({ required: true, unique: false })
  public name: string;

  @Prop({ required: false, unique: false })
  public contactPhone: string;

  @Prop({ required: true, unique: false })
  public role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
