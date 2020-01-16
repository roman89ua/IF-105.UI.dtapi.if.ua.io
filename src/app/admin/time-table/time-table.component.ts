import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {TimeTableService} from './time-table.service';
import {Group, Subject, } from '../entity.interface';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {isArray} from 'util';
import {TimeTable} from '../../shared/entity.interface';
import {MatTableDataSource} from '@angular/material';
import {never} from 'rxjs';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  dataSource = new MatTableDataSource<TimeTable>();
  displayedColumns: string[] = [
    'id',
    'group',
    'start_date',
    'start_time'
  ];

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) {
  }

  subjects: Subject[] = [];
  subjectId: any;
  groups: string[];
  timeTable: TimeTable[] = [];

  subjectGroup: FormGroup;

  ngOnInit() {
    this.getSubjects();
    this.subjectGroup = this.formBuilder.group({subjectId: ''});
    this.getTimeTable();
  }

  private getSubjects() {
    this.httpService.getRecords('subject').subscribe((response: Subject[]) => {
      this.subjects = response;
    });
  }

  private getTimeTable(): void {
    let table = [];
    this.subjects = [];
    this.subjectGroup.get('subjectId').valueChanges.subscribe(value => {
      this.subjectId = value;
      this.httpService.getTimeTable('getTimeTablesForSubject/', this.subjectId).subscribe((response: TimeTable[]) => {
        if (isArray(response)) {
          table = response;
          const ids = table.map(a => Number(a.group_id));
          this.httpService.getByEntity('Group', ids).subscribe((value1: [{
            group_name: string;
          }]) => {
            const groups = value1.map(a => a.group_name);
            for (let i = 0; i <= groups.length; i++) {
              table[i].group_name = groups[i];
            }
          });
          this.timeTable = table;
          this.dataSource.data = table;
        } else {
          this.timeTable = [];
        }
      });
    });
  }

}
