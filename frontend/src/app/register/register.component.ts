import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerInfo = {
    username: '',
    password: '',
    passwordCheck: ''
  }

  constructor(private auth: AuthenticationService, private router: Router, private error: ErrorService) {}

  register() {
    this.auth.register(this.registerInfo).subscribe({
      next: () => this.router.navigate(['login']),
      error: (e) => {
        this.error.addError(e.error.status);
        this.router.navigate(['invalid']);
      }
    })
  }
}
