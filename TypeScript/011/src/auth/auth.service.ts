import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email + ' erg ' + password);
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('пользователь не найден');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async createToken(user: any) {
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    };
    return this.jwtService.sign(payload);
  }
}
