import { Expose, Transform, Type } from 'class-transformer';
import { UserDto, SuportUserDto } from './user.dto';

export class SupportDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  isActive: boolean;

  @Expose({ name: 'hasNewMessages' })
  @Transform(({ value }) => value.some((message) => !message.readAt))
  messages;

  constructor(partial: Partial<SupportDto>) {
    Object.assign(this, partial);
  }
}

export class SupportManagerDto extends SupportDto {
  @Expose({ name: 'client' })
  @Type(() => UserDto)
  user: UserDto;

  constructor(partial: Partial<SupportManagerDto>) {
    super(partial);
  }
}

export class SupportMessageDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose({ name: 'createdAt' })
  sentAt: Date;

  @Expose()
  text: string;

  @Expose()
  @Transform(({ value }) => value ?? null)
  readAt: Date;

  @Expose()
  @Type(() => SuportUserDto)
  author: SuportUserDto;

  constructor(partial: Partial<SupportMessageDto>) {
    Object.assign(this, partial);
  }
}
