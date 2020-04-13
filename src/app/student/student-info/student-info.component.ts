import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {StudentInfo, TestsForStudent} from '../../shared/entity.interface';
import {Router} from '@angular/router';
import {Test} from '../../admin/entity.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {ModalService} from '../../shared/services/modal.service';
import {SessionStorageService} from 'angular-web-storage';
import {StudentInfoService} from '../student-info.service';
import {defaultImage} from '../../shared/default-image/default-image';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  dataSource = new MatTableDataSource<TestsForStudent>();
  displayedColumns: string[] = [
    'subject',
    'test',
    'start',
    'end',
    'tasks',
    'duration',
    'attempts',
    'actions'
  ];

  @ViewChild('table') table: MatTable<Element>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private apiService: ApiService,
    private studentInfoService: StudentInfoService,
    private router: Router,
    private modalService: ModalService,
    public session: SessionStorageService,
  ) {
  }

  studentInfo: StudentInfo;
  currDate: Date;
  testInProgress: boolean;

  ngOnInit() {
    this.currDate = new Date();
    this.studentInfoService.getUserData().subscribe(
      (result: any[]) => {
        if (result[0].photo === '') {
          result[0].photo = defaultImage;
          this.studentInfo = result[0];
        } else {
          this.studentInfo = result[0];
        }
        this.formDataSource(result[1], result[2]);
      });
  }


  private formDataSource(timeTableArray: TestsForStudent[], testArray: Test[]) {
    const data = [];
    testArray.forEach(value => {
      let row: TestsForStudent;
      timeTableArray.map(value1 => {
        if (value1.subject_id === value.subject_id) {
          row = Object.assign(value, value1);
          row.can_be_start = this.canTestBeStart(row);
          data.push(row);
        }
      });
    });
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }

  private canTestBeStart(row: TestsForStudent) {
    const startDate = new Date(`${row.start_date} ${row.start_time}`);
    const endDate = new Date(`${row.end_date} ${row.end_time}`);
    return this.currDate >= startDate && this.currDate <= endDate && +row.enabled === 1;
  }

  public goToTest(tableEl: TestsForStudent) {
    if (tableEl.can_be_start) {
      this.session.set('testInProgress', true);
      this.router.navigate(['student/test-player'], {
        queryParams: {
          id: tableEl.test_id,
        }
      });
    } else {
      this.modalService.openAlertModal('Тест ще не доступний для проходження на даний момент', '', '');
    }
  }

}
