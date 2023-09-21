import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let code: number, data: string | HttpException;
    if (exception instanceof HttpException) {
      code = exception.getStatus();
      data = exception;
    } else {
      code = 500;
      data = ctx.getRequest<Request>().url;
    }
    const responseBody = {
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: data,
      code: code,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, code);
  }
}
