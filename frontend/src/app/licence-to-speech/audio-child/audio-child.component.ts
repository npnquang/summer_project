import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-audio-child',
  standalone: true,
  imports: [],
  templateUrl: './audio-child.component.html',
  styleUrl: './audio-child.component.css'
})
export class AudioChildComponent {
  @Input({required: true}) url: string = '';

  @Output() closeShow = new EventEmitter<boolean>();

  constructor() {}

  close() {
    this.closeShow.emit(false);
  }
}
