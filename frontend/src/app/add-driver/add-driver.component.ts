import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { Driver } from '../../models/driver';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

/**
 * Component to insert new driver
 *
 * @export
 * @class AddDriverComponent
 * @typedef {AddDriverComponent}
 */
@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  // new driver instance
  driver: Driver = new Driver();

  /**
   * Creates an instance of AddDriverComponent.
   *
   * @constructor
   * @param {BackendService} db
   * @param {ErrorService} errorService
   * @param {Router} router
   */
  constructor(private db: BackendService, private errorService: ErrorService, private router: Router) {}

  
  /** Send POST request to insert new driver */
  addDriver() {
    if (this.driver.name && this.driver.department && this.driver.licence) {
      const driverInfo = {
        driver_name: this.driver.name,
        driver_department: this.driver.department,
        driver_licence: this.driver.licence,
        driver_isActive: this.driver.isActive
      };
      
      this.db.addDriver(driverInfo).subscribe({
        next: () => this.router.navigate(['driver/list']),
        error: (e) => {
          let errors: string[] = e.error.status.slice(26).split(','); // remove the "Driver validation failed: " string pattern and split the error message into multiple parts
          errors.forEach((error: string) => {
            error = error.split(':')[1];
            this.errorService.addError(error);
          });
          this.router.navigate(['invalid']);
        }
      });

    }
  }
}
