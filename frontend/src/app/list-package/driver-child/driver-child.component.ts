import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from '../../../models/driver';
import { UpperCasePipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-driver-child',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, TitleCasePipe],
  templateUrl: './driver-child.component.html',
  styleUrl: './driver-child.component.css'
})
export class DriverChildComponent {
  @Input({ required: true}) driver: Driver = new Driver();
  @Output() closeShow = new EventEmitter<boolean>();

  constructor() {}

  close() {
    this.closeShow.emit(false);
  }
}
