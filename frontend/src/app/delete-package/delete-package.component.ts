import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {
  id: string = '';
  
  constructor(private db: BackendService, private errorService: ErrorService, private router: Router) {}

  deletePackage() {
    this.db.deletePackage(this.id).subscribe({
      next: () => this.router.navigate(['package/list']),
      error: (e) => {
        this.errorService.addError(e.error.status);
        this.router.navigate(['invalid']);
      }
    });
  }
}
