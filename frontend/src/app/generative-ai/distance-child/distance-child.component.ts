import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-distance-child',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './distance-child.component.html',
  styleUrl: './distance-child.component.css'
})
export class DistanceChildComponent {
  @Input({required: true}) distance: number = 0;
  @Input({required: true}) destination: string = '';

  @Output() closeShow = new EventEmitter<boolean>();

  constructor() {}

  close() {
    this.closeShow.emit(false);
  }
}
