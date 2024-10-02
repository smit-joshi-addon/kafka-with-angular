import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient = new Client();
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/iot-websocket', // Your Spring Boot WebSocket endpoint
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.subscribeToMessages();
      },
      debug: (msg) => console.log(msg),
      onStompError: (frame) => {
        console.error('Broker error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    this.stompClient.activate(); // Activate the STOMP client
  }

  subscribeToMessages() {
    this.stompClient.subscribe('/topic/messages', (message: any) => {
      console.log('Received message: ' + message.body);
      this.messagesSubject.next(message); // Push the message body to the subject
    });
  }


  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate(); // Deactivate the STOMP client
      console.log('Disconnected');
    }
  }
}
