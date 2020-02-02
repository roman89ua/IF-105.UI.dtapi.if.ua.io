import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import { GetStudentsInterface } from '../students/interfaces/get-students-interface';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private apiService: ApiService,) { }

  getListGroup(): Observable<any> {
    return this.apiService.getEntity('group');
  }

  getListTest(): Observable<any> {
    return this.apiService.getEntity('test');
  }

  getResultTestIdsByGroup(id_group: number): Observable<any> {
    return this.apiService.getResultTestIdsByGroup(id_group);
  }

  getRecordsByTestGroupDate(test_id: number, group_id: number): Observable<any> {
    return this.apiService.getRecordsByTestGroupDate(test_id, group_id);
  }

  getListStudentsBuGroup(group_id: number): Observable<any>{
    return this.apiService.getEntityByAction('Student', 'getStudentsByGroup', group_id);
  }
  /** GET fullname student by user_id */
  getFullNameStudent(user_id: number, list: GetStudentsInterface[]): string {
    let currentUser: GetStudentsInterface = null;
    for (let item of list) {
      if (+item.user_id == user_id) {
        currentUser = item;
      }
    }
    return `${currentUser.student_surname} ${currentUser.student_name} ${currentUser.student_fname}`;
  }
  /** Get duration test */
  getDurationTest(date: string, start_time: string, end_time:string): string {
    let startDate = `${date} ${start_time}`;
    let endDate = `${date} ${end_time}`;
    let duration = Date.parse(endDate) - Date.parse(startDate);
    return this.msToTime(duration);
  }

  private msToTime(duration: number) : string{
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24); 
    return `${(hours < 10) ? "0" + hours : hours}:${(minutes < 10) ? "0" + minutes : minutes}:${(seconds < 10) ? "0" + seconds : seconds}`;
  }
}
