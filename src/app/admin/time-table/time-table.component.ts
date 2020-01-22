import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {TimeTableService} from './time-table.service';
import {Group, Subject} from '../entity.interface';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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

  @ViewChild('table', {static: false}) table: MatTable<Element>;

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

  addTimeTableDialog(): void {
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
      if (result) {
        const validDate = this.formatDate(result.start_date);
        const validTime = result.start_time.length < 6 ? result.start_time + ':00' : result.start_time;
        result.start_date = validDate;
        result.end_date = validDate;
        result.start_time = validTime;
        result.end_time = validTime;
        this.addTimeTable(result);
      }
    });
  }

  editTimeTableDialog(tableEl: TimeTable): void {
    const dialogRef = this.dialog.open(TimeTableAddDialogComponent, {
      width: '500px',
      data: {
        data: tableEl,
        description: {
          title: 'Редагувати дані розкладу',
          action: 'Редагувати'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const validDate = this.formatDate(result.start_date);
        const validTime = result.start_time.length < 6 ? result.start_time + ':00' : result.start_time;
        result.start_date = validDate;
        result.end_date = validDate;
        result.start_time = validTime;
        result.end_time = validTime;
        this.editTimeTable(result);
      }
    });
  }

  private getSubjects() {
    this.httpService.getRecords('subject').subscribe((response: Subject[]) => {
      this.subjects = response;
    });
  }

  private getTimeTable(): void {
    let table: TimeTable[];
    this.subjects = [];
    this.subjectGroup.get('subjectId').valueChanges.subscribe(value => {
      this.subjectId = value;
      this.httpService.getTimeTable('getTimeTablesForSubject/', this.subjectId).subscribe((result: any) => {
        if (!result.response) {
          table = result;
          const ids = table.map(a => Number(a.group_id));
          this.httpService.getByEntity('Group', ids).subscribe((value1: Group[]) => {
            table.map(a => {
              value1.find(obj => {
                if (obj.group_id === a.group_id) {
                  a.group_name = obj.group_name;
                }
              });
            });
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

  private addTimeTable(data: TimeTable) {
    this.httpService.insertData('timeTable', data).subscribe((result: TimeTable[]) => {
      if (result[0].subject_id === this.subjectId) {
        const updatedTable: TimeTable[] = result;
        this.httpService.getRecord('group', result[0].group_id).subscribe((value: Group[]) => {
          updatedTable[0].group_name = value[0].group_name;
          this.timeTable.push(updatedTable[0]);
          this.dataSource.data.push(updatedTable[0]);
          this.table.renderRows();
        });
      }
    });
  }

  private editTimeTable(data: TimeTable) {
    this.httpService.update('timeTable', data.timetable_id, data).subscribe((result: TimeTable[]) => {
      const index: number = result
        ? this.timeTable.findIndex(
          tt => tt.timetable_id === result[0].timetable_id
        )
        : -1;
      if (index > -1) {
        this.timeTable[index] = result[0];
      }
    }, (error: any) => {
      if (error.error.response.includes('Error when update')) {
        this.modalService.openInfoModal('Не вдалося оновити розклад');
      } else {
        this.modalService.openInfoModal('Помилка оновлення');
      }
    });
  }

  private formatDate(date) {
    let day: string = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

