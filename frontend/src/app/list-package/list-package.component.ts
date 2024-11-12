import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { Package } from '../../models/package';
import { UpperCasePipe, DatePipe, DecimalPipe } from '@angular/common';
import { Driver } from '../../models/driver';
import { DriverChildComponent } from './driver-child/driver-child.component';


@Component({
  selector: 'app-list-package',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, DecimalPipe, DriverChildComponent],
  templateUrl: './list-package.component.html',
  styleUrl: './list-package.component.css'
})
export class ListPackageComponent {
  // a list of current packages
  packages: Package[] = [];
  driver: Driver = new Driver();
  show: boolean = false

    
  /**
   * Creates an instance of ListPackageComponent.
   *
   * @constructor
   * @param {BackendService} db
   */
  constructor(private db: BackendService) {}


  /** Initialization logic */
  ngOnInit() {
    // retrieve packages
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
      if (data.length > 0) this.driver = data[0].driverId;
    })
  }


  /**
   * Send a DELETE request to delete the package based on its ID
   *
   * @param {string} id
   */
  deleteButton(id: string) {
    this.db.deletePackage(id).subscribe({
      next: () => this.packages = this.packages.filter(driver => driver._id !== id),
      error: (error) => (console.log(error))
    })
  }


  toggleShow(i: number) {
    if (!this.show) this.show = true;
    this.driver = this.packages[i].driverId
  }

  close(newValue: boolean) {
    this.show = newValue;
  }
}
