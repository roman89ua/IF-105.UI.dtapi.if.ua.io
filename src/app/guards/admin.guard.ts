import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }
  canLoad(route: Route): Observable<boolean> {
    return this.authService.getCurrentUser()
      .pipe(
        map(currentUser => {
          const allowed = currentUser.roles.includes("admin");
          if (!allowed) {
            this.router.navigate(['404']);
          }
          return allowed;
        })
      )
  }
}
