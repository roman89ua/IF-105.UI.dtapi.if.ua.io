import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {TimeTableService} from './time-table.service';
import {Group, Subject} from '../entity.interface';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {isArray} from 'util';
import {TimeTable} from '../../shared/entity.interface';
import {MatDialog, MatTable, MatTableDataSource} from '@angular/material';
import {TimeTableAddDialogComponent} from './time-table-add-dialog/time-table-add-dialog.component';
import {ModalService} from '../../shared/services/modal.service';

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
    'start_time',
    'actions'
  ];

  @ViewChild('table', {static: true}) table: MatTable<Group>;

  constructor(private httpService: HttpService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modalService: ModalService) {
  }

  subjects: Subject[] = [];
  subjectId: any;
  timeTable: TimeTable[] = [];

  subjectGroup: FormGroup;

  ngOnInit() {
    this.getSubjects();
    this.subjectGroup = this.formBuilder.group({subjectId: ''});
    this.getTimeTable();
  }

  addTimeTableDialog(id): void {
    const dialogRef = this.dialog.open(TimeTableAddDialogComponent, {
      width: '500px',
      data: {
        data: {},
        description: {
          title: 'Додати новий розклад',
          action: 'Додати'
        },
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
    });
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
            for (let i = 0; i < groups.length; i++) {
              table[i].group_name = groups[i];
            }
          });
          this.timeTable = table;
          this.dataSource.data = table;
        } else {
          this.timeTable = [];
          this.dataSource.data = [];
        }
      });
    });
  }

  private addTimeTable(timeTable: TimeTable) {
    this.httpService.insertData('timeTable', timeTable).subscribe((result: TimeTable[]) => {
      this.timeTable.push(result[0]);
      this.table.renderRows();
    });
  }
}
