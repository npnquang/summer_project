import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  let login: boolean = false;
  
  auth.isLoggedInSubject.subscribe({
    next: (data) => login = data,
    error: (e) => console.log(e)
  })
  

  if (login) {
    return true;
  }

  router.navigate(['login']);
  return false;

};
