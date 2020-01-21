import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, private router: Router) {}
  currentUser$: Observable<any>;

    isSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isXSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  logoutHandler() {
    this.authService.logout()
    .subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
