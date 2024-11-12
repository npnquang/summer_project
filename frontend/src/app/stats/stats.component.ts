import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

interface Stats {
  create: number,
  read: number,
  update: number,
  delete: number
}


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  stats: Stats = {
    create: 0, 
    read: 0,
    update: 0,
    delete: 0
  };

  constructor(private db: BackendService) { }

  ngOnInit() {
    this.db.getStats().subscribe({
      next: (data: any) => this.stats = data,
      error: (e) => console.log(e)
    })
  }
}
