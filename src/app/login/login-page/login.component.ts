import { Component, OnInit } from '@angular/core';
import { catchError, withLatestFrom, map } from 'rxjs/operators';
import { of, combineLatest, BehaviorSubject } from 'rxjs';
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
    const facultiesSubject = new BehaviorSubject([])
    facultiesSubject.next([
      { id: 1, name: 'faculty 1' },
      { id: 2, name: 'faculty 2' },
      { id: 3, name: 'faculty 3' },
  ]);
  const groupsSubject = new BehaviorSubject([])
     groupsSubject.next([
      { faculty_id: 1, group_name: 'PI-16' },
      { faculty_id: 2, group_name: 'PI-15' },
      { faculty_id: 3, group_name: 'PI-14' },
  ]);
  facultiesSubject.next(
    [
      { id: 1, name: 'faculty 11' },
      { id: 2, name: 'faculty 22' },
      { id: 3, name: 'faculty 33' },
  ]
  );
   groupsSubject.pipe(
      withLatestFrom(facultiesSubject),
      map(([groups,faculties]) => {
        console.log(groups, faculties);
        return this.finder(groups,faculties)
      })
    )
    .subscribe(data => console.log(data));
  }

  getLogo() {
    this.loginService.getLogo()
      .subscribe(data => this.logo = data);
  }
  finder(groups, faculties) {
   return groups.map((item) => {
      const faculty = this.findFacultyById(faculties,item.faculty_id);
      return {
        ...item,
        fack: faculty.name
      }
    });

    }
  findFacultyById(faculty: Array<any>,id: number) {
   return faculty.find((item) => item.id === id);
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
