import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) { }

  countRecord = [
    { name: this.translate.instant('dashboard.faculties'), icon: 'school', route: '/faculties', numberOfRecords: null },
    { name: this.translate.instant('dashboard.group'), icon: 'group', route: 'group', numberOfRecords: null },
    { name: this.translate.instant('dashboard.speciality'), icon: 'library_books', route: 'speciality', numberOfRecords: null },
    { name: this.translate.instant('dashboard.subjects'), icon: 'local_library', route: 'subjects', numberOfRecords: null },
    { name: this.translate.instant('dashboard.students'), icon: 'assignment_ind', route: 'group', numberOfRecords: null },
    { name: this.translate.instant('dashboard.question'), icon: 'question_answer', route: 'subjects', numberOfRecords: null },
    { name: this.translate.instant('dashboard.tests'), icon: 'spellcheck', route: 'subjects', numberOfRecords: null },
    { name: this.translate.instant('dashboard.admin-user'), icon: 'person', route: 'admin-user', numberOfRecords: null },
    { name: this.translate.instant('dashboard.results'), icon: 'assessment', route: 'results' },
  ];

  ngOnInit() {
    this.getCountRecords();
  }
  getCountRecords() {
    forkJoin(
      this.apiService.getCountRecords('Faculty').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Group').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Speciality').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Subject').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
        this.apiService.getCountRecords('Student').pipe(
          catchError(err => of({ numberOfRecords: 0 }))),
        this.apiService.getCountRecords('Question').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Test').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('AdminUser').pipe(
        catchError(err => of({ numberOfRecords: 0 })))
    )
      .subscribe(result => {

        result.forEach((item, i) => {
          this.countRecord[i].numberOfRecords = item.numberOfRecords;
        });
      });
  }
}
