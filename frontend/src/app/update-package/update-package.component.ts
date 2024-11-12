import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  updateInfo = {
    id: '',
    package_destination: '',
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
  updatePackage() {
    this.db.updatePackage(this.updateInfo).subscribe({
      next: () => this.router.navigate(['package/list']),
      error: (e) => {
        this.errror.addError(e.error.status);
        this.router.navigate(['invalid']);
      }
    })
  }
}
