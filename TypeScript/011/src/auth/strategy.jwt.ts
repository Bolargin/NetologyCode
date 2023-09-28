import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_CONSTANT,
    });
  }

  async validate(query: any): Promise<any> {
    console.log('validate ' + query.username);
    const user = await this.authService.validateEmail(query.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
