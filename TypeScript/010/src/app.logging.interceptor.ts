import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`Время выполнения: ${Date.now() - now}ms.`);
      }),
      map((data) => ({ status: 'success', data: data })),
      catchError((error) => {
        console.log(`Время выполнения: ${Date.now() - now}ms. ${error}`);
        return throwError(
          () =>
            new HttpException(
              {
                status: 'fail',
                data: `name: ${error.name} message: ${error.message} at: ${error.at} text: ${error.text}`,
              },
              HttpStatus.FORBIDDEN,
            ),
        );
      }),
    );
  }
}
