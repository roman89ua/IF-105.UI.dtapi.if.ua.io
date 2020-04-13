import {Component, Inject, OnInit} from '@angular/core';
import {Group, TimeTable} from '../../../shared/entity.interface';
import {Subject} from '../../entity.interface';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgModule} from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../../shared/format-datepicker/format-datepicker';
import {ApiService} from 'src/app/shared/services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../shared/services/modal.service';

export interface DialogData {
  data: any;
  description: {
    title: string,
    action: string
  };
}


@Component({
  selector: 'app-time-table-add-dialog',
  templateUrl: './time-table-add-dialog.component.html',
  styleUrls: ['./time-table-add-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class TimeTableAddDialogComponent implements OnInit {
  timeTable: TimeTable[] = [];
  groups: Group[] = [];
  subjects: Subject[] = [];
  addEditForm: FormGroup;
  currDate: Date;
  startDate: Date;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<TimeTableAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {
    this.apiService.getEntity('Group').subscribe((value: Group[]) => {
      this.groups = value;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
    this.apiService.getEntity('Subject').subscribe((value: Subject[]) => {
      this.subjects = value;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
    this.currDate = new Date();
    this.startDate = new Date();

    this.dialogRef.disableClose = true;
    this.addEditForm = this.fb.group({
      timetable_id: [this.data.data.timetable_id],
      group_id: [this.data.data.group_id, Validators.required],
      subject_id: [this.data.data.subject_id, Validators.required],
      start_date: [this.data.data.start_date, Validators.required],
      start_time: [this.data.data.start_time, Validators.required],
      end_date: [this.data.data.end_date, Validators.required],
      end_time: [this.data.data.end_time, Validators.required]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.addEditForm.value);
  }

  onDismiss() {
    this.dialogRef.close();
  }

  addEvent($event) {
    this.startDate = $event.value;
  }
}
