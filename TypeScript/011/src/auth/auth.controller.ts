import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard.jwt';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async login(@Request() req) {
    console.log('login first ' + JSON.stringify(req.body));
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async loginjwt(@Request() req) {
    console.log('loginjwt ' + JSON.stringify(req.user));
    return req.user;
  }
}
