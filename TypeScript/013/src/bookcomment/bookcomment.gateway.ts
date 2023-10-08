/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BookCommentService } from './bookcomment.service';
import { BookCommentDto } from './interfaces/bookcomment.dto';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway({ cors: true })
export class Gateway {
  constructor(private readonly appService: BookCommentService) {}

  @SubscribeMessage('getAllComments')
  getAllComments(
    @MessageBody('bookid') bookid: string,
    client: any,
    payload: any,
  ): Observable<WsResponse<any>> {
    const res = this.appService.findAllBookComment();
    return from(res).pipe(
      map((data) => ({ event: 'comments', data: JSON.stringify(data) })),
    );
  }
  @SubscribeMessage('addComment')
  addComment(
    @MessageBody('data') data: BookCommentDto,
    @ConnectedSocket() client: Socket,
  ): any {
    if (data.bookid && data.comment) {
      const res = this.appService.create(data);
      return res;
    }
  }
}
