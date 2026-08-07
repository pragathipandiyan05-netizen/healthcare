import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SosGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyNewSosAlert(alertData: any) {
    this.server.emit('sos.created', alertData);
  }

  notifySosAcknowledged(alertData: any) {
    this.server.emit('sos.acknowledged', alertData);
  }

  notifySosAssigned(alertData: any) {
    this.server.emit('sos.assigned', alertData);
  }

  notifySosResolved(alertData: any) {
    this.server.emit('sos.resolved', alertData);
  }

  notifySosEscalated(alertData: any) {
    this.server.emit('sos.escalated', alertData);
  }
}
