import {Component, OnInit, ViewChild} from '@angular/core';
import {Group, Subject} from '../entity.interface';
import {FormBuilder} from '@angular/forms';
import {TimeTable} from '../../shared/entity.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {TimeTableAddDialogComponent} from './time-table-add-dialog/time-table-add-dialog.component';
import {ModalService} from '../../shared/services/modal.service';
import {ApiService} from 'src/app/shared/services/api.service';
import {isString} from 'util';
import {ActivatedRoute} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';

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
    'end_date',
    'end_time',
    'actions'
  ];

  @ViewChild('table') table: MatTable<Element>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modalService: ModalService,
              private route: ActivatedRoute) {
  }

  subject: Subject;
  subjectId: any;
  id: any;
  timeTable: TimeTable[] = [];
  isLoaded: boolean;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.subjectId = params.params.id;
      this.getTimeTable(this.subjectId);
      this.getSubject(this.subjectId);
    });
  }

  addTimeTableDialog(): void {
    const dialogRef = this.dialog.open(TimeTableAddDialogComponent, {
      width: '600px',
      data: {
        data: {
          subject_id: this.subjectId,
          start_time: '',
          end_time: '',
        },
        description: {
          title: 'Додати новий розклад',
          action: 'Додати'
        },
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.start_date = this.formatDate(result.start_date);
        result.end_date = this.formatDate(result.end_date);
        result.start_time = result.start_time.length < 6 ? result.start_time + ':00' : result.start_time;
        result.end_time = result.end_time.length < 6 ? result.end_time + ':00' : result.end_time;
        delete result.timetable_id;
        this.addTimeTable(result);
      }
    });
  }

  editTimeTableDialog(tableEl: TimeTable): void {
    const dialogRef = this.dialog.open(TimeTableAddDialogComponent, {
      width: '600px',
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
        result.start_date = this.formatDate(result.start_date);
        result.end_date = this.formatDate(result.end_date);
        result.start_time = result.start_time.length < 6 ? result.start_time + ':00' : result.start_time;
        result.end_time = result.end_time.length < 6 ? result.end_time + ':00' : result.end_time;
        let groupName: string;
        this.apiService.getEntity('Group', result.group_id).subscribe((group: Group[]) => {
          groupName = group[0].group_name;
          // this.editTimeTable(result, groupName);
          this.editTimeTable(result, groupName);
        });
      }
    });
  }

  openConfirmDialog(tableEl: TimeTable) {
    const massage = `Ви дійсно хочете видалити розклад для групи: ${tableEl.group_name}`;
    this.modalService.openConfirmModal(massage, () => {
      this.deleteTimeTable(tableEl);
    });
  }

  private getSubject(id) {
    this.apiService.getEntity('Subject', id).subscribe((response: Subject[]) => {
      this.subject = response[0];
    });
  }

  private getTimeTable(subjectId): Subscription {
    return this.apiService.getEntityByAction('timeTable', 'getTimeTablesForSubject', subjectId).pipe(
      switchMap(data => {
        if (!data.response) {
          return this.getTimeTableInfo(data);
        } else {
          this.isLoaded = true;
          return EMPTY;
        }
      })
    ).subscribe((data: any) => {
        this.timeTable.push(data);
        this.dataSource.data.push(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  private getTimeTableInfo(data) {
    const table = data;
    const ids = table.map(a => Number(a.group_id));
    return this.apiService.getByEntityManager('Group', ids).pipe(
      switchMap(value => {
        table.map(a => {
          value.find(obj => {
            if (obj.group_id === a.group_id) {
              a.group_name = obj.group_name;
            }
          });
        });
        return table;
      })
    );
  }

  private addTimeTable(data: TimeTable): Subscription {
    let updatedTable: TimeTable[];
    return this.apiService.createEntity('TimeTable', data).pipe(
      catchError(err => {
        throw err;
      }),
      switchMap((result: TimeTable[]) => {
        if (result[0].subject_id === this.subjectId) {
          updatedTable = result;
          return this.apiService.getEntity('Group', result[0].group_id);
        }
      }),
      switchMap((value: Group[]) => {
        updatedTable[0].group_name = value[0].group_name;
        return updatedTable;
      })
    ).subscribe(() => {
      this.dataSource.data.push(updatedTable[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    },
      err => {
        if (err.error.response.includes('Wrong input')) {
          this.modalService.openInfoModal('Не правильно введені дані');
        } else if (err.error.response.includes('ERROR: SQLSTATE[23000]: Integrity constraint violation')) {
          this.modalService.openInfoModal('Розклад для вибраної групи та предмету вже заданий');
        } else {
          this.modalService.openInfoModal('Помилка оновлення');
        }
      });
  }

  private editTimeTable(data: TimeTable, groupName) {
    return this.apiService.updEntity('timeTable', data, data.timetable_id).pipe(
      catchError(err => {
        throw err;
      })
    ).subscribe(
      (result: TimeTable[]) => {
        const index: number = result
          ? this.timeTable.findIndex(
            tt => tt.timetable_id === result[0].timetable_id
          )
          : -1;
        if (index > -1) {
          result[0].group_name = groupName;
          this.timeTable[index] = result[0];
          this.dataSource.data[index] = result[0];
          this.table.renderRows();
          this.dataSource.paginator = this.paginator;
        }
      },
      (err: any) => {
        if (err.error.response.includes('Wrong input')) {
          this.modalService.openInfoModal('Не правильно введені дані');
        } else if (err.error.response.includes('ERROR: SQLSTATE[23000]: Integrity constraint violation')) {
          this.modalService.openInfoModal('Розклад для вибраної групи та предмету вже заданий');
        } else {
          this.modalService.openInfoModal('Помилка оновлення');
        }
      }
    );
  }

  private deleteTimeTable(data: TimeTable) {
    this.apiService.delEntity('timeTable', data.timetable_id).subscribe((result: any) => {
      if (result) {
        this.timeTable = this.timeTable.filter(tt => tt.timetable_id !== data.timetable_id);
        this.dataSource.data = this.timeTable;
        this.table.renderRows();
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  private formatDate(date) {
    if (!isString(date)) {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    } else {
      return date;
    }
  }


}


