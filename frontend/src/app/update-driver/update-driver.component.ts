import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';


/**
 * Component to update driver
 *
 * @export
 * @class UpdateDriverComponent
 * @typedef {UpdateDriverComponent}
 */
@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  // object to store update information
  updateInfo = {
    id: '',
    driver_licence: '',
    driver_department: ''
  }

  
  /**
   * Creates an instance of UpdateDriverComponent.
   *
   * @constructor
   * @param {BackendService} db
   * @param {ErrorService} errror
   * @param {Router} router
   */
  constructor(private db: BackendService, private errror: ErrorService, private router: Router) {}

  
  /** Send a PUT request to update driver */
  updateDriver() {
    this.db.updateDriver(this.updateInfo).subscribe({
      next: () => this.router.navigate(['driver/list']),
      error: (e) => {
        this.errror.addError(e.error.status);
        this.router.navigate(['invalid']);
      }
    })
  }
}
