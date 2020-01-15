import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {TimeTableService, TimeTable} from './time-table.service';
import {Group, Subject} from '../entity.interface';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {isArray} from 'util';

// import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  // dataSource = new MatTableDataSource<TimeTable>();

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) {
  }

  subjects: Subject[] = [];
  subjectId: any;
  groups: Group[] = [];
  timeTable: TimeTable[] = [];
  subjectGroup: FormGroup;

  ngOnInit() {
    this.getSubjects();
    // this.getTimeTable();
    this.subjectGroup = this.formBuilder.group({subjectId: ''});
    this.onValueChanges();
  }

  /*  private getGroups() {
      this.httpService.getRecords('group').subscribe((response => {
        this.groups = response;
      }));
    }*/

  private getSubjects() {
    this.httpService.getRecords('subject').subscribe((response: Subject[]) => {
      this.subjects = response;
    });
  }

  private getTimeTable() {
    this.httpService.getRecords('timeTable').subscribe((response: TimeTable[]) => {
      this.timeTable = response;
    });
  }

  private onValueChanges(): void {
    this.subjects = [];
    this.subjectGroup.get('subjectId').valueChanges.subscribe(value => {
      this.subjectId = value;
      this.httpService.getTimeTable('getTimeTablesForSubject/', this.subjectId).subscribe((response: TimeTable[]) => {
        if (isArray(response)) {
          this.timeTable = response;
        }
      });
    });
  }
}
