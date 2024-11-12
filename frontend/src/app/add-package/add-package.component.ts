import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { Package } from '../../models/package';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';
import { Driver } from '../../models/driver';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  package: Package = new Package();
  drivers: Driver[] = [];

  constructor(private db: BackendService, private errorService: ErrorService, private router: Router) {
    this.db.getDrivers().subscribe({
      next: (data: any) => this.drivers = data
    })
  }

  addPackage() {
    if (this.package.title && this.package.destination && this.package.driverId._id) {
      const packageInfo = {
        package_title: this.package.title,
        package_weight: this.package.weight,
        package_destination: this.package.destination,
        isAllocated: this.package.isAllocated,
        package_description: this.package.description,
        driver_id: this.package.driverId._id
      };

      this.db.addPackge(packageInfo).subscribe({
        next: () => this.router.navigate(['package/list']),
        error: (e) => {
          console.log(e.error);
          let errors: string[] = e.error.status.slice(26).split(',');
          errors.forEach((error: string) => {
            error = error.split(':')[1];
            this.errorService.addError(error);
          });
          this.router.navigate(['invalid']);
        }
      })
    }
  }
}
