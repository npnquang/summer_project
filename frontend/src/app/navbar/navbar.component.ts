import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';


/**
 * Component for the navbar
 *
 * @export
 * @class NavbarComponent
 * @typedef {NavbarComponent}
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  login: boolean = false;

  constructor(private auth: AuthenticationService) {
    this.auth.isLoggedInSubject.subscribe({
      next: (data) => this.login = data,
      error: (e) => console.log(e)
    })
    this.auth.checkAuth();
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.checkAuth();
      },
      error: (e) => console.log(e)
    })
  }
}
