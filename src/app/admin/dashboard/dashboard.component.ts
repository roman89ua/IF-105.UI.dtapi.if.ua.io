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
    { name: 'Фалькутети', icon: 'school', numberOfRecords: null },
    { name: 'Групи', icon: 'group', numberOfRecords: null },
    { name: 'Адміни', icon: 'person', numberOfRecords: null },
    { name: 'Предмети', icon: 'local_library', numberOfRecords: null },
    { name: 'Питання', icon: 'question_answer', numberOfRecords: null },
    { name: 'Тести', icon: 'spellcheck', numberOfRecords: null },
    { name: 'Студенти', icon: 'assignment_ind', numberOfRecords: null },
    { name: 'Спеціальності', icon: 'library_books', numberOfRecords: null },
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
      this.apiService.getCountRecords('AdminUser').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Subject').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Question').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Test').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Student').pipe(
        catchError(err => of({ numberOfRecords: 0 }))),
      this.apiService.getCountRecords('Speciality').pipe(
        catchError(err => of({ numberOfRecords: 0 })))
    )
      .subscribe(result => {
        result.forEach((item, i) => {
          this.countRecord[i].numberOfRecords = item.numberOfRecords;
        });
      });
  }
}
