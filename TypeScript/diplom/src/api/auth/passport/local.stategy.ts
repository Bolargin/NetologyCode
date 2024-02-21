import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/base/user/user.schema';
import { UserService } from 'src/base/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User | null> {
    const userValid = await this.userService.findByEmail(email.trim());
    if (!userValid) {
      throw new UnauthorizedException('Invalid email');
    }
    const passwordValid = await compare(password, userValid.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    if (userValid && passwordValid) {
      return userValid;
    }
    return null;
  }
}
