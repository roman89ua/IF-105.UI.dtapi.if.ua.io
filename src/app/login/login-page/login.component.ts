import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { LoginService } from '../login.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userData: { username: string; password: string; } = { username: null, password: null };
  public error = null;
  public logo: SafeResourceUrl;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLogo();
  }

  getLogo() {
    this.loginService.getLogo()
      .subscribe(data => this.logo = data);
  }
  login() {
    this.authService
      .login(this.userData)
      .pipe(
        catchError(({ error }) => {
          this.error = error.response;
          return of();
        }),
      )
      .subscribe(() => {
        this.error = null;
        this.router.navigate(['admin']);
      });
  }
}
