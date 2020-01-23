import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetStudentsInterface } from '../interfaces/get-students-interface';
import { CreareUpdateStudentsInterface } from '../interfaces/creare-update-students-interface';
import { ResponseInterface } from '../interfaces/response-interface';

@Injectable()
export class StudentsService {

  private createStudentUrl = 'Student/insertData';
  private readStudentUrl = 'Student/getStudentsByGroup';
  private updateStudentUrl = 'Student/update';
  private deleteStudentUrl = 'Student/del';
  private getUserInfoURL = 'AdminUser/getRecords';

  private checkStudentNameURL = 'AdminUser/checkUserName';
  private checkStudentEmailURL = 'AdminUser/checkEmailAddress';

  private checkGradebookIdURL = 'Student/checkGradebookID';

  constructor(private httpClient: HttpClient) {}

  getStudentsByGroup(id: number): Observable<GetStudentsInterface[] & ResponseInterface> {
    return this.httpClient.get<GetStudentsInterface[] & ResponseInterface>(`${this.readStudentUrl}/${id}`);
  }

  deleteStudent(id: number): Observable<ResponseInterface> {
    return this.httpClient.get<ResponseInterface>(`${this.deleteStudentUrl}/${id}`);
  }

  createStudent(body): Observable<CreareUpdateStudentsInterface|ResponseInterface> {
    return this.httpClient.post<CreareUpdateStudentsInterface|ResponseInterface>(`${this.createStudentUrl}`, body);
  }

  updateStudent(id: number, body): Observable<CreareUpdateStudentsInterface|ResponseInterface> {
    return this.httpClient.post<CreareUpdateStudentsInterface|ResponseInterface>(`${this.updateStudentUrl}/${id}`, body);
  }

  getUserInfo(id: string){
    return this.httpClient.get(`${this.getUserInfoURL}/${id}`);
  }

  checkUsername(username: string) {
    return this.httpClient.get(`${this.checkStudentNameURL}/${username}`);
  }

  checkUserEmail(email: string) {
    return this.httpClient.get(`${this.checkStudentEmailURL}/${email}`);
  }

  checkGradebookID(gradebook_id: string) {
    return this.httpClient.get(`${this.checkGradebookIdURL}/${gradebook_id}`);
  }
}
