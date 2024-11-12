import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginInfo = {
    username: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router, private error: ErrorService) {}

  login() {
    this.auth.login(this.loginInfo).subscribe({
      next: () => {
        this.auth.checkAuth();
        this.router.navigate(['']);
      },
      error: (e) => {
        this.error.addError(e.error.status);
        this.router.navigate(['invalid']);
      }
    });
  }
}
