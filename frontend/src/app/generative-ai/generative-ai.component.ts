import { Component } from '@angular/core';
import { SocketIoService } from '../../services/socket/socket.io.service';
import { BackendService } from '../../services/backend/backend.service';
import { Package } from '../../models/package';
import { UpperCasePipe, DatePipe, DecimalPipe } from '@angular/common';
import { DistanceChildComponent } from './distance-child/distance-child.component';

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, DecimalPipe, DistanceChildComponent],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAiComponent {
  destination: string = '';
  distance: number = -1;
  packages: Package[] = [];
  show: boolean = false;
  
  constructor(private socket: SocketIoService, private db: BackendService) {
    this.socket.receiveDistance().subscribe({
      next: (data) => this.distance = data / 1000,
      error: (e) => console.log(e)
    });

    this.db.getPackages().subscribe({
      next: (data: any) => this.packages = data,
      error: (e) => console.log(e)
    });
  }

  getDistance(destination: string) {
    if (!this.show) this.show = true;
    this.socket.getDistance(destination);
    this.destination = destination;
  }

  close(newValue: boolean) {
    this.show = newValue;
  }
}
