import {
  Controller,
  Post,
  Get,
  Request,
  Res,
  Body,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/base/user/user.service';
import { SearchUserParams } from 'src/base/user/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';
import { RegisterAdmin, RegisterUser } from './auth.interface';
import { LoginGuard } from './guard/login.guard';
import { MongooseClassSerializerInterceptor } from 'src/common/mongooseClassSerializer.interceptor';
import { RoleUserDto, LoginUserDto, RegUserDto } from 'src/common/dto/user.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role, ROLE } from 'src/common/interfaces/role.interface';

@Controller()
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly userService: UserService) {}

  private async regUser(body: RegisterUser, role: Role) {
    const passwordHash = hashSync(body.password, genSaltSync(10));
    return await this.userService.create({
      email: body.email,
      passwordHash: passwordHash,
      name: body.name,
      contactPhone: body.contactPhone,
      role: role,
    });
  }

  @Post('auth/login')
  @UseGuards(LoginGuard)
  @UseInterceptors(MongooseClassSerializerInterceptor(LoginUserDto))
  async login(@Request() req) {
    return req.user;
  }

  @Post('auth/logout')
  @Roles([ROLE.Client, ROLE.Managеr, ROLE.Admin])
  async logout(@Request() req, @Res() res): Promise<void> {
    req.session.destroy();
    res.status(204).send();
  }

  @Post('client/register')
  @UseInterceptors(MongooseClassSerializerInterceptor(RegUserDto))
  async register(@Body() body: RegisterUser) {
    return await this.regUser(body, ROLE.Client);
  }

  @Post('admin/users')
  @Roles([ROLE.Admin])
  @UseInterceptors(MongooseClassSerializerInterceptor(RoleUserDto))
  async createUser(@Body() { role, ...data }: RegisterAdmin) {
    return await this.regUser(data, role);
  }

  @Get(['admin/users'])
  @Roles([ROLE.Admin])
  @UseInterceptors(MongooseClassSerializerInterceptor(RoleUserDto))
  async getUsersAdmin(@Query() body: SearchUserParams) {
    return await this.userService.findAll(body);
  }

  @Get(['manager/users'])
  @Roles([ROLE.Managеr])
  @UseInterceptors(MongooseClassSerializerInterceptor(RoleUserDto))
  async getUsersManeger(@Query() body: SearchUserParams) {
    return await this.userService.findAll(body);
  }
}
