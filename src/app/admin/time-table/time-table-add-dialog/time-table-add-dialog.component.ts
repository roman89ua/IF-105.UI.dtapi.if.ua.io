import {Component, Inject, OnInit} from '@angular/core';
import {Group, TimeTable} from '../../../shared/entity.interface';
import {HttpService} from '../../../shared/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgModule} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../../shared/format-datepicker/format-datepicker';

export interface DialogData {
  data: any;
  description: any;
}


@Component({
  selector: 'app-time-table-add-dialog',
  templateUrl: './time-table-add-dialog.component.html',
  styleUrls: ['./time-table-add-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
@NgModule({})
export class TimeTableAddDialogComponent implements OnInit {
  timeTable: TimeTable[] = [];
  groups: Group[] = [];
  subjects: any = [];

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<TimeTableAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit() {
    this.httpService.getRecords('group').subscribe((value: Group[]) => {
      this.groups = value;
    });
    this.httpService.getRecords('subject').subscribe(value => {
      this.subjects = value;
    });
  }

}
