import { Component } from '@angular/core';
import { SocketIoService } from '../../services/socket/socket.io.service';
import { UpperCasePipe, DatePipe, TitleCasePipe } from '@angular/common';
import { BackendService } from '../../services/backend/backend.service';
import { Driver } from '../../models/driver';
import { AudioChildComponent } from './audio-child/audio-child.component';

@Component({
  selector: 'app-licence-to-speech',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, TitleCasePipe, AudioChildComponent],
  templateUrl: './licence-to-speech.component.html',
  styleUrl: './licence-to-speech.component.css'
})
export class LicenceToSpeechComponent {
  drivers: Driver[] = [];
  show: boolean = false;
  url: string = "";
  
  constructor(private socket: SocketIoService, private db: BackendService) {
    this.db.getDrivers().subscribe({
      next: (data: any) => this.drivers = data,
      error: (e) => console.log(e)
    })
    
  }

  sendTextToSpeech(text: string) {
    if (!this.show) this.show = true;

    this.show = true;
    this.socket.sendTextToSpeech(text);
    setTimeout(() => {
      this.url = "/audio/" + text + ".mp3";
    }, 1000);
  }

  close(newValue: boolean) {
    this.show = newValue;
  }
}
