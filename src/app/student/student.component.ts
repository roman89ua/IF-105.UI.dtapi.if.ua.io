import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {ApiService} from '../shared/services/api.service';
import {Faculty, Group, Speciality, StudentInfo, TimeTable, TestsForStudent} from '../shared/entity.interface';
import {Router} from '@angular/router';
import {Subject, Test} from '../admin/entity.interface';
import {MatTable, MatTableDataSource} from '@angular/material';
import {ModalService} from '../shared/services/modal.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

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

  constructor(
    public authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private modalService: ModalService
  ) {
  }

  studentId;
  studentInfo: StudentInfo;
  // timeTable: TimeTable[];
  testInfo: TestsForStudent[];

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.studentId = data.id;
      this.getStudentInfo(data.id);
    });
  }

  private getStudentInfo(id) {
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
      let row = {};
      timeTableArray.map(value1 => {
        if (value1.subject_id === value.subject_id) {
          row = Object.assign(value, value1);
          data.push(row);
        }
      });
    });
    this.dataSource.data = data;
  }

  private goToTest(testId, enabled) {
    console.log(enabled);
    if (enabled === '1') {
      this.router.navigate(['student/test-player'], {
        queryParams: {
          test_id: testId,
        }
      });
    } else {
      this.modalService.openAlertModal('Тест ще не доступний для проходження на даний момент', '', '');
    }
  }

  private goTest() {
    this.router.navigate(['student/test']);
  }

  private logoutHandler() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['login']);
      });
  }
}
