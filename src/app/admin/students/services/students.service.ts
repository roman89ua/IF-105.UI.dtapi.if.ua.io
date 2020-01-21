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

  private checkStudentNameURL = 'AdminUser/checkUserName';
  private checkStudentEmailURL = 'AdminUser/checkEmailAddress';

  private checkGradebookID = 'Student/checkGradebookID';

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

  updateUser(body, id: number): Observable<CreareUpdateStudentsInterface|ResponseInterface> {
    return this.httpClient.post<CreareUpdateStudentsInterface|ResponseInterface>(`${this.updateStudentUrl}/${id}`, body);
  }

  checkUsername(username: string) {
    return this.httpClient.get(`${this.checkStudentNameURL}/${username}`);
  }

  checkUserEmail(email: string) {
    return this.httpClient.get(`${this.checkStudentEmailURL}/${email}`);
  }

  checkGradebookId(gradebook_id: string) {
    return this.httpClient.get(`${this.checkGradebookID}/${gradebook_id}`);
  }
}
