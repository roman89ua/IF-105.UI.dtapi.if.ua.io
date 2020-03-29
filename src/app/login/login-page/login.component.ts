import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { LoginService } from '../login.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { LangBtnService } from '../../shared/services/lang-btn.service';

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
    private router: Router,
    private langBtnService: LangBtnService
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
          this.userData.username = null;
          this.userData.password = null;
          return of();
        }),
      )
      .subscribe((response: any) => {
        this.error = null;
        const navigateTo = response.roles.includes('admin') ? 'admin' : 'student';
        this.router.navigate([navigateTo]);
      });
  }
  changeLang(language: string) {
    this.langBtnService.switchLanguage(language);
  }
}
