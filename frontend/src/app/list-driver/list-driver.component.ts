import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { Driver } from '../../models/driver';
import { Package } from '../../models/package';
import { UpperCasePipe, DatePipe, TitleCasePipe } from '@angular/common';
import { PackageChildComponent } from './package-child/package-child.component';

/**
 * Component to list all drivers and their information
 *
 * @export
 * @class ListDriverComponent
 * @typedef {ListDriverComponent}
 */
@Component({
  selector: 'app-list-driver',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, TitleCasePipe, PackageChildComponent],
  templateUrl: './list-driver.component.html',
  styleUrl: './list-driver.component.css'
})
export class ListDriverComponent {
  // a list of current drivers
  drivers: Driver[] = [];
  packages: Package[] = [];
  show: boolean = false;

  
  /**
   * Creates an instance of ListDriverComponent.
   *
   * @constructor
   * @param {BackendService} db
   */
  constructor(private db: BackendService) {}
  
  
  /** Initialization logic */
  ngOnInit() {
    // retrieve drivers
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
      if (data.length > 0) this.packages = data[0].assigned_packages;
    })
  }

  
  /**
   * Send a DELETE request to delete the drive based on their ID
   *
   * @param {string} id
   */
  deleteButton(id: string) {
    this.db.deleteDriver(id).subscribe({
      next: () => this.drivers = this.drivers.filter(driver => driver._id !== id),
      error: (error) => (console.log(error))
    })
  }


  toggleShow(i: number) {
    if (!this.show) this.show = true;
    this.packages = this.drivers[i].assigned_packages;
  }

  
  close(newValue: boolean) {
    this.show = newValue;
  }
}
