import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { guardLogin } from '../login/store/login.action';
import { selectUserData } from '../login/store/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanLoad {
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
          const allowed =  currentUser.roles.includes('student');
          if (!allowed) {
            this.router.navigate(['404']);
          }
          return allowed;
        })
      );
  }
}
