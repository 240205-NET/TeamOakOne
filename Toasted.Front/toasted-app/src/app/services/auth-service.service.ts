import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  baseUrl: string = 'https://project2-revtraining.azurewebsites.net/api/';
  isLoggedIn: boolean = true;

  //baseUrl : string = 'https://localhost:7019/api/';
  //isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  toggleLogin() {
    console.log('Login status: ' + this.isLoggedIn);
    this.isLoggedIn = !this.isLoggedIn;
    console.log('New login status: ' + this.isLoggedIn);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .get(
        this.baseUrl +
          'user/login?username=' +
          username +
          '&password=' +
          password
      )
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            console.log('Not found error occurred');
            return of(null);
          }
          return throwError(() => err);
        })
      );
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    location: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + 'user', {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      location: location,
    });
  }
}
