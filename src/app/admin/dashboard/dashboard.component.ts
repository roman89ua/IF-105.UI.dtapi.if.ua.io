import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countRecord = [
    { name: 'Факультети', icon: 'school', route: '/faculties', numberOfRecords: null },
    { name: 'Групи', icon: 'group', route: 'group', numberOfRecords: null },
    { name: 'Спеціальності', icon: 'library_books', route: 'speciality', numberOfRecords: null },
    { name: 'Предмети', icon: 'local_library', route: 'subjects', numberOfRecords: null },
    { name: 'Студенти', icon: 'assignment_ind', route: 'group', numberOfRecords: null },
    { name: 'Питання', icon: 'question_answer', route: 'subjects', numberOfRecords: null },
    { name: 'Тести', icon: 'spellcheck', route: 'subjects', numberOfRecords: null },
    { name: 'Адміни', icon: 'person', route: 'admin-user', numberOfRecords: null },
    { name: 'Результати', icon: 'assessment', route: 'results' },
  ];
  constructor(private apiService: ApiService) { }

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
