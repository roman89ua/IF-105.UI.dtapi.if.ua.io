import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Log } from './protocol.interface';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(private apiService: ApiService) { }
  /** returns data about tests with provided ids */
  getTests(idsArray) {
    return idsArray.length > 0 ? this.apiService.getByEntityManager('Test', idsArray) : of(null);
  }
  /** returns data about users with provided ids */
  getUsers(idsArray) {
    return idsArray.length > 0 ? this.apiService.getByEntityManager('Student', idsArray) : of(null);
  }
  /** returns logs filtered by date period */
  getLogs(date: Date) {
    return this.apiService.getEntity('Log').pipe(
      map((data: Array<Log>) => this.filterByDate(data, date))
    );
  }
  /** takes logs data and returns data that passes date filter */
  filterByDate(data: Array<Log>, date): Array<any> {
    return data.filter((element) => {
      const logsdate = new Date(element.log_date);
      const startDate = new Date(date.startDate);
      const endDate = this.getEndDate(new Date(date.endDate));
      return (logsdate >= startDate && logsdate <= endDate);
    });
  }
  /** returns date with hours set to 23-59-59 for correct filtering last day in period */
  getEndDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  }
  /** returns unique tests ids  */
  getTestIds(data) {
    return [...new Set(data.map(item => +item.test_id))];
  }
  /** returns unique user ids */
  getUserIds(data) {
    return [...new Set(data.map(item => +item.user_id))];
  }
  /** returns concated from logs,tests and user enitites object for protocol page grid */
  getProtocolObj(data) {
    return data[0].map(element => {
      const testName = this.findTestName(data[1], element.test_id);
      const userName = this.getUserName(data[2], element.user_id);
      return { ...element, testName, userName };
    });
  }
  /** returns test name for provided id */
  findTestName(data, testId): string {
    const test = data.find(obj => {
      return obj.test_id === testId;
    });
    return test === undefined ? undefined : test.test_name;
  }
  /** returns user object for provided id */
  findUserObj(data, userId): object {
    const user = data.find(obj => {
      return obj.user_id === userId;
    });
    return user === undefined ? undefined : user;
  }
  /** returns concated full student name from (name + surname + last name) */
  getStudentFullName(user): string {
    return `${user.student_surname} ${user.student_name} ${user.student_fname}`;
  }
  /** returns full user name for provided user id  */
  getUserName(data, userId): string {
    return this.getStudentFullName(this.findUserObj(data, userId));
  }
}
