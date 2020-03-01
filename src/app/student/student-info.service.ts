import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Faculty, Group, Speciality, StudentInfo, TimeTable} from '../shared/entity.interface';
import {concatMap, map, switchMap} from 'rxjs/operators';
import {Subject, Test} from '../admin/entity.interface';
import {AuthService} from '../shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getUserData() {
    return  this.authService.getCurrentUser().pipe(
      switchMap(user => {
        return this.getData(user.id);
      })
    );
  }

  getStudent(studentId) {
    return this.http.get(`Student/getRecords/${studentId}`);
  }

  getGroup(groupId) {
    return this.http.get(`Group/getRecords/${groupId}`);
  }

  getFaculty(facultyId) {
    return this.http.get(`Faculty/getRecords/${facultyId}`);
  }

  getSpeciality(specId) {
    return this.http.get(`Speciality/getRecords/${specId}`);
  }

  getTimeTableByGroup(groupId) {
    return this.http.get(`timeTable/getTimeTablesForGroup/${groupId}`);
  }

  getSubjects() {
    return this.http.get('Subject/getRecords');
  }

  getTests() {
    return this.http.get('Test/getRecords');
  }

  getStudentInfo(id) {
    const studentInfo: StudentInfo[] = [];
    return this.getStudent(id).pipe(
      switchMap((studentData: StudentInfo[]) => {
        studentInfo.push(studentData[0]);
        return this.getGroup(studentInfo[0].group_id);
      }),
      switchMap((groupData: Group[]) => {
        studentInfo[0].group_name = groupData[0].group_name;
        studentInfo[0].faculty_id = groupData[0].faculty_id;
        studentInfo[0].speciality_id = groupData[0].speciality_id;
        return this.getFaculty(studentInfo[0].faculty_id);
      }),
      switchMap((facultyData: Faculty[]) => {
        studentInfo[0].faculty_name = facultyData[0].faculty_name;
        return this.getSpeciality(studentInfo[0].speciality_id);
      }),
      switchMap((specData: Speciality[]) => {
        studentInfo[0].speciality_name = specData[0].speciality_name;
        studentInfo[0].speciality_code = specData[0].speciality_code;
        return studentInfo;
      })
    );
  }

  getTimeTable(groupId) {
    const timeTable = [];
    return this.getTimeTableByGroup(groupId).pipe(
      switchMap((timeTableData: TimeTable[]) => {
        const filteredTimeTable = timeTableData
          .map(({timetable_id, group_id, ...rest}) => rest);
        timeTable.push(filteredTimeTable);
        return this.getSubjects();
      }),
      switchMap((subjectsData: Subject[]) => {
        timeTable[0].forEach(value => {
          subjectsData.map(value1 => {
            if (value1.subject_id === value.subject_id) {
              value.subject_name = value1.subject_name;
            }
          });
        });
        return timeTable;
      })
    );
  }

  getTestsInfo(timeTableData: TimeTable[]) {
    const timeTable = timeTableData;
    const filteredTests: any[] = [];
    return this.getTests().pipe(
      concatMap((testData: Test[]) => {
        filteredTests.push(timeTable.map(tt => testData.filter(test => test.subject_id === tt.subject_id)));
        return filteredTests;
      })
    );
  }

  getData(studentId) {
    let student;
    let timeTable;
    let tests;
    return this.getStudentInfo(studentId).pipe(
      switchMap(studentData => {
        student = (studentData);
        return this.getTimeTable(studentData.group_id);
      }),
      switchMap(timetableData => {
        timeTable = timetableData;
        return this.getTestsInfo(timeTable);
      }),
      map((testsData: any) => {
        tests = [].concat(...testsData);
        return [student, timeTable, tests];
      })
    );
  }
}


