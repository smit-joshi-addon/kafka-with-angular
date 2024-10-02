import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './service/websocket/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kafka-with-angular';

  constructor(private socket: WebsocketService) {
  }
}
