import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthService {
  public currentUser: any = null;

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  login(userData: { username: string; password: string; }) {
    return this.http
      .post(`login`, userData)
      .pipe(
        tap((data) => {
          this.currentUser = data;
        })
      );
  }

  logout() {
    return this.http
      .get('login/logout')
      .pipe(
        tap(() => {
          this.currentUser = null;
        })
      );
  }
  getCurrentUser() {
    return this.http
      .get('login/isLogged')
      .pipe(
        tap((data: any) => {
          if (data && data.response === 'non logged') {
            this.currentUser = null;
            this.router.navigate(['login']);

            return;
          }
          this.currentUser = data;
        })
      );
  }
}
