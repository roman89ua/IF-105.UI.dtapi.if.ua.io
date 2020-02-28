import {Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSidenav } from '@angular/material';
import { User } from '../entity.interface';
import { TranslateService } from '@ngx-translate/core';
import {SessionStorage, SessionStorageService} from 'angular-web-storage';
import {ModalService} from '../services/modal.service';
import { TestLogoutService } from '../services/test-logout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  currentUser$: Observable<any>;
  user: User;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService,
    public session: SessionStorageService,
    private modalService: ModalService,
    private testLogoutService: TestLogoutService,
  ) { }


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
    this.authService.getCurrentUser()
      .subscribe((response: User) => {
        this.user = response;
      });
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }
  logOut() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['login']);
      });

  }

  logoutHandler() {
    const test = this.session.get('testInProgress');
    if (test) {
      this.modalService.openConfirmModal('Тест триває! Ваша спроба буде зарахованва. Ви дійсно хочете вийти?', () => {
        this.session.clear();
        this.testLogoutService.updateMessage(true);
        this.logOut();
      });
    } else {
      this.logOut();
    }
  }
}
