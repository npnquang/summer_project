import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

/**
 * Component to delete a driver based on their ID
 *
 * @export
 * @class DeleteDriverComponent
 * @typedef {DeleteDriverComponent}
 */
@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  id: string = '';

  /**
   * Creates an instance of DeleteDriverComponent.
   *
   * @constructor
   * @param {BackendService} db
   * @param {ErrorService} errorService
   * @param {Router} router
   */
  constructor(private db: BackendService, private errorService: ErrorService, private router: Router) {}

  /** Send a DELETE request to delete a driver based on their ID */
  deleteDriver() {
    this.db.deleteDriver(this.id).subscribe({
      next: () => this.router.navigate(['driver/list']),
      error: (e) => {
        this.errorService.addError(e.error.status);
        this.router.navigate(['invalid']);
      }
    });
  }
}
