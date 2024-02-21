import { OnApplicationShutdown } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Subject, Subscription } from 'rxjs';
import { Server } from 'socket.io';

interface WebsocketEvent {
  name: string;
  data: unknown;
}

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnApplicationShutdown {
  @WebSocketServer() server: Server;
  constructor() {}
  private subject = new Subject<WebsocketEvent>();
  private subscription: Subscription;

  addEvent(eventName: string, eventData: unknown): void {
    this.subject.next({ name: eventName, data: eventData });
  }

  onApplicationShutdown() {
    this.subscription.unsubscribe();
  }

  @SubscribeMessage('subscribeToChat')
  addComment(@MessageBody('data') data: string): any {
    this.subscription = this.subject.subscribe({
      next: (event) => this.server.emit('message', event.data),
    });
    return `subscribed ${data}`;
  }
}
