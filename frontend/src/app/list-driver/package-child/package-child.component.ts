import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Package } from '../../../models/package';
import { UpperCasePipe, DatePipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-package-child',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, DecimalPipe],
  templateUrl: './package-child.component.html',
  styleUrl: './package-child.component.css'
})
export class PackageChildComponent {
  @Input({ required: true}) packages: Package[] = [];
  @Output() closeShow = new EventEmitter<boolean>();

  constructor() {}

  close() {
    this.closeShow.emit(false);
  }
}
