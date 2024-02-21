import { Expose, Transform } from 'class-transformer';
import { Role } from '../interfaces/role.interface';

export class RegUserDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class UserDto extends RegUserDto {
  @Expose()
  contactPhone: string;
}

export class RoleUserDto extends UserDto {
  @Expose()
  role: Role;
}

export class LoginUserDto {
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  contactPhone: string;

  constructor(partial: Partial<LoginUserDto>) {
    Object.assign(this, partial);
  }
}

export class SuportUserDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Expose()
  name: string;

  constructor(partial: Partial<SuportUserDto>) {
    Object.assign(this, partial);
  }
}
