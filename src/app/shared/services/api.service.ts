import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // in case of interseptior missing add url into apiURI
  apiURI = '';

  constructor(private http: HttpClient) { }

  getEntity(entity: string, id?: number): Observable<any> {
    if (id === undefined) {
      return this.http.get(`${this.apiURI}${entity}/getRecords`);
    }

    return this.http.get(`${this.apiURI}${entity}/getRecords/${id}`);
  }
  createEntity(entity: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}${entity}/insertData`, payload);
  }
  delEntity(entity: string, id: number): Observable<any> {
    return this.http.get(`${this.apiURI}${entity}/del/${id}`);
  }
  updEntity(entity: string, payload, id: number): Observable<any> {
    return this.http.post(`${this.apiURI}${entity}/update/${id}`, payload);
  }
  getEntityByAction(entity: string, action: string, id: number): Observable<any> {
    return this.http.get(`${this.apiURI}${entity}/${action}/${id}`);
  }
  /** Returns JSON with entities that have provided id */
  getByEntityManager(entity: string, idsList: Array<number>): Observable<any> {
    const data = {
      entity: entity,
      ids: idsList
    };
    return this.http.post(`${this.apiURI}EntityManager/getEntityValues`, data);
  }
  /** GET range records with optional parameters: fieldName and direction (1 or -1) using for sorting data */
  getRecordsRange(entity: string, limit: number, offset: number, fieldName: string = null, direction: number = 1): Observable<any> {
    let url: string;
    if (fieldName) {
      url = `${entity}/getRecordsRange/${limit}/${offset}/${fieldName}/${direction}`;
    } else {
      url = `${entity}/getRecordsRange/${limit}/${offset}`;
    }
    return this.http.get(url);
  }
  /** Get student's results for student_id */
  getRecordsbyStudent(student_id: number): Observable<any> {
    return this.http.get(`${this.apiURI}Result/getRecordsbyStudent/${student_id}`);
  }
  /** Result/countTestPassesByStudent/<student_id>/<test_id> */
  getCountTestPassesByStudent(student_id: number, test_id: number): Observable<any> {
    return this.http.get(`${this.apiURI}Result/countTestPassesByStudent/${student_id}/${test_id}`);
  }
  /** GET with student's results by test_id, group_id (optional) and date (optional) */
  getRecordsByTestGroupDate(test_id: number, group_id: number = null, tdate: string = null ): Observable<any> {
    let url = `Result/getRecordsByTestGroupDate/${test_id}/${group_id}`;

    if (tdate) {
      url += `/${tdate}`;
    }

    return this.http.get(url);
  }
  /** GET all test_ids which were passed by students of some group  */
  getResultTestIdsByGroup(group_id: number): Observable<any> {
    return this.http.get(`${this.apiURI}/Result/getResultTestIdsByGroup/${group_id}`);
  }

  /** GET count records */
  getCountRecords(entity: string): Observable<any> {
    return this.http.get(`${entity}/countRecords`);
  }

  /** GET tests by subject id */
  getTestsBySubject(entity: string, subject_id: number): Observable<any> {
    return this.http.get(`${entity}/getTestsBySubject/${subject_id}`);
  }

  /** GET test details by test id */
  getTestDetailsByTest(entity: string, test_id: number): Observable<any> {
    return  this.http.get(`${entity}/getTestDetailsByTest/${test_id}`);
  }
  /** GET answers which related to question with question_id  */
  getAnswersByQuestion(test_id: number) {
    return this.http.get('answer/getAnswersByQuestion/' + test_id);
  }
  getSearch(entity: string, searchStr: string) {
    return this.http.get(`${entity}/getRecordsBySearch/${searchStr}`);
  }
}
