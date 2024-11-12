import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const API_URL = "/32963742/James/api/v1";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  checkAuth() {
    this.http.get<{status: boolean}>(API_URL + "/check-auth").subscribe({
      next: (data) => this.isLoggedInSubject.next(data.status),
      error: (e) => console.error(e)
    });
  }


  login(loginInfo: any) {
    return this.http.post(API_URL + "/login", loginInfo, httpOptions);
  }

  register(registerInfo: any) {
    return this.http.post(API_URL + "/register", registerInfo, httpOptions);
  }

  logout() {
    return this.http.post(API_URL + "/logout", null, httpOptions);
  }
}
