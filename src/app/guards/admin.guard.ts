import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { guardLogin } from '../login/store/login.action';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
  }
  canLoad(route: Route): Observable<boolean> {
    return this.authService.getCurrentUser()
      .pipe(
        tap((currentUser) => {
          if (currentUser.response === 'logged') {
            this.store.dispatch(guardLogin({user: currentUser}));
          }
        }),
        map(currentUser => {
          const allowed = currentUser.roles.includes('admin');
          if (!allowed) {
            this.router.navigate(['404']);
          } else {
            return allowed;
          }
        })
      );
  }
}
