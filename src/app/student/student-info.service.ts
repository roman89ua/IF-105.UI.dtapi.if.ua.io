import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Faculty, Group, Speciality, StudentInfo} from '../shared/entity.interface';
import {switchMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  constructor(private http: HttpClient) {
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
      switchMap(data => {
        timeTable.push(data);
        return timeTable;
      })
    );
  }

  getData(studentId) {
    const student = [];
    const timeTable = [];
    return this.getStudentInfo(studentId).pipe(
      switchMap(studentData => {
        student.push(studentData);
        return this.getTimeTable(studentData.group_id);
      }),
      switchMap(timetableData => {
        timeTable.push(timetableData);
        return forkJoin(student, timeTable);
      })
    );
  }
}
