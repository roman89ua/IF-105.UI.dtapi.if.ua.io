import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {ApiService} from '../../shared/services/api.service';
import {Faculty, Group, Speciality, StudentInfo, TimeTable, TestsForStudent} from '../../shared/entity.interface';
import {Router} from '@angular/router';
import {Subject, Test} from '../../admin/entity.interface';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {ModalService} from '../../shared/services/modal.service';
import {SessionStorageService, SessionStorage} from 'angular-web-storage';

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

  @ViewChild('table', {static: false}) table: MatTable<Element>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    public authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private modalService: ModalService,
    public session: SessionStorageService,
  ) {
  }

  studentId;
  studentInfo: StudentInfo;
  testInfo: TestsForStudent[];
  currDate: Date;
  testInProgress: boolean;

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.studentId = data.id;
      this.getStudentInfo(data.id);
    });
    this.currDate = new Date();
  }

  private getStudentInfo(id) {
    // GET Student Info
    this.apiService.getEntity('student', id).subscribe((data: StudentInfo[]) => {
      this.studentInfo = data[0];
      this.apiService.getEntity('group', this.studentInfo.group_id).subscribe((groupData: Group[]) => {
        this.studentInfo.group_name = groupData[0].group_name;
        this.studentInfo.faculty_id = groupData[0].faculty_id;
        this.studentInfo.speciality_id = groupData[0].speciality_id;
        this.apiService.getEntity('faculty', this.studentInfo.faculty_id).subscribe((facultyData: Faculty[]) => {
          this.studentInfo.faculty_name = facultyData[0].faculty_name;
          this.apiService.getEntity('speciality', this.studentInfo.speciality_id).subscribe((specialityData: Speciality[]) => {
            this.studentInfo.speciality_code = specialityData[0].speciality_code;
            this.studentInfo.speciality_name = specialityData[0].speciality_name;
            // GET Time Table & Test Details
            this.apiService.getEntityByAction('timeTable', 'getTimeTablesForGroup', this.studentInfo.group_id)
              .subscribe((result: TimeTable[]) => {
                let timeTable: any = [];
                result.forEach(item => {
                  delete item.timetable_id;
                  delete item.group_id;
                });
                timeTable = result;
                this.apiService.getEntity('Subject').subscribe((subjectData: Subject[]) => {
                  timeTable.forEach(value => {
                    subjectData.map(value1 => {
                      if (value1.subject_id === value.subject_id) {
                        value.subject_name = value1.subject_name;
                      }
                    });
                  });
                  // GET Test Info & make data in correct format for Data Source
                  this.apiService.getEntity('test').subscribe((testData: Test[]) => {
                    const filteredTests: any = timeTable.map(tt => testData.filter(test => test.subject_id === tt.subject_id));
                    const merged: Test[] = [].concat.apply([], filteredTests);
                    this.formDataSource(timeTable, merged);
                  });
                });
              });
          });
        });
      });
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
