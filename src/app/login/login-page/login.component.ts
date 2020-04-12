import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { LoginService } from '../login.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { LangBtnService } from '../../shared/services/lang-btn.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { login } from '../store/login.action';

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
    private langBtnService: LangBtnService,
    private store: Store<AppState>
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
        .subscribe((response: any) => {
          const {id, username, roles} = response;
          this.error = null;

          this.store.dispatch(login({user: {id, username, roles}}));

          const navigateTo = response.roles.includes('admin') ? 'admin' : 'student';
          this.router.navigate([navigateTo]);
        }, ({error}) => {
          this.userData.username = null;
          this.userData.password = null;
          this.error = 'Не вірний пароль або логін';
        });
  }
  changeLang(language: string) {
    this.langBtnService.switchLanguage(language);
  }
}
