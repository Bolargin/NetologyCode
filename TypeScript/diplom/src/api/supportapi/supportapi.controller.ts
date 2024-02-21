import {
  Body,
  Controller,
  //ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { SupportRequestService } from 'src/base/support/supportbase.service';
import { SupportRequestClientService } from 'src/base/support/supportclient.service';
import { SupportRequestEmployeeService } from 'src/base/support/supportemployee.service';
import { MongooseClassSerializerInterceptor } from 'src/common/mongooseClassSerializer.interceptor';
import {
  SupportDto,
  SupportManagerDto,
  SupportMessageDto,
} from 'src/common/dto/support.dto';
import { ROLE } from 'src/common/interfaces/role.interface';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import {
  MarkAsReadParams,
  SupportParams,
  SupportQueryParams,
} from './supportapi.interface';
//import { Message, SupportRequest } from 'src/base/support/support.schema';
@Controller()
@SerializeOptions({ strategy: 'excludeAll' })
export class SupportRequestApiController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  @Post('client/support-requests')
  @Roles([ROLE.Client])
  @UseInterceptors(MongooseClassSerializerInterceptor(SupportDto))
  async createSupportRequest(@Body() body: SupportParams, @CurrentUser() user) {
    return await this.supportRequestClientService.createSupportRequest({
      ...body,
      user: user._id,
    });
  }

  @Get('client/support-requests')
  @Roles([ROLE.Client])
  @UseInterceptors(MongooseClassSerializerInterceptor(SupportDto))
  async getClientSupportRequests(
    @CurrentUser() user,
    @Query() params: SupportQueryParams,
  ) {
    return await this.supportRequestService.findSupportRequests({
      ...params,
      user: user._id,
    });
  }

  @Get('manager/support-requests')
  @Roles([ROLE.Managеr])
  @UseInterceptors(MongooseClassSerializerInterceptor(SupportManagerDto))
  async getSupportRequests(@Query() params: SupportQueryParams) {
    return await this.supportRequestService.findSupportRequests({ ...params });
  }

  @Get('common/support-requests/:id/messages')
  @Roles([ROLE.Client, ROLE.Managеr])
  @UseInterceptors(MongooseClassSerializerInterceptor(SupportMessageDto))
  async getSupportRequestsMessages(
    @Param('id') id: string,
    @CurrentUser() user,
  ) {
    if (user.role == ROLE.Client) {
      await this.supportRequestService.verificatAuthor(id, user._id);
    }
    return await this.supportRequestService.getMessages(id);
  }

  @Post('common/support-requests/:id/messages')
  @Roles([ROLE.Client, ROLE.Managеr])
  @UseInterceptors(MongooseClassSerializerInterceptor(SupportMessageDto))
  async sendMessage(
    @Param('id') id: string,
    @CurrentUser() user,
    @Body() body: SupportParams,
  ) {
    return await this.supportRequestService.sendMessage({
      supportRequest: id,
      author: user._id,
      ...body,
    });
  }

  @Post('common/support-requests/:id/messages/read')
  @Roles([ROLE.Client, ROLE.Managеr])
  @UseInterceptors(MongooseClassSerializerInterceptor(SupportMessageDto))
  async markRead(
    @Param('id') supportRequest: string,
    @CurrentUser() user,
    @Body() body: MarkAsReadParams,
    @Res() res,
  ) {
    if (user.role == ROLE.Managеr) {
      const params = {
        supportRequest,
        createdBefore: new Date(body.createdBefore),
      };
      await this.supportRequestEmployeeService.markMessagesAsRead(params);
    } else if (user.role == ROLE.Client) {
      await this.supportRequestService.verificatAuthor(
        supportRequest,
        user._id,
      );
      await this.supportRequestClientService.markMessagesAsRead({
        supportRequest,
        createdBefore: new Date(body.createdBefore),
        user: user._id,
      });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
    });
  }
}
