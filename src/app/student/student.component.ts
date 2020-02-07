import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../shared/entity.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
  }

  currentUser: string;

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((data: User) => {
      this.currentUser = data.username;
    });
  }

  private logoutHandler() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['login']);
      });
  }
}
