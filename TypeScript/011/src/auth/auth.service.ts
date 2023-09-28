import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  authService: any;
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    console.log('login ' + user.email + ' ' + user.password);
    const query = await this.usersService.getUser({ email: user.email });
    console.log('login 01 ' + JSON.stringify(query));
    if (!query) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(user.password, query.password);
    if (!query) {
      throw new NotAcceptableException('could not find the password');
    }
    if (user && passwordValid) {
      const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async validateEmail(email: string): Promise<any> {
    console.log('validateEmail ' + email);
    const user = await this.usersService.getUser({ email: email });
    if (!user) {
      return null;
    }
    return user;
  }
}
