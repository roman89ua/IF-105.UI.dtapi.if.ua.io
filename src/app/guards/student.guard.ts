import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }
  canLoad(route: Route): Observable<boolean> {
    return this.authService.getCurrentUser()
      .pipe(
        map(currentUser => {
          const allowed = currentUser.roles.includes('admin') ||  currentUser.roles.includes('student');
          if (!allowed) {
            this.router.navigate(['404']);
          }
          return allowed;
        })
      )
  }
}
