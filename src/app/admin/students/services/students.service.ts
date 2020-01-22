import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentsService {

  private checkStudentNameURL = 'AdminUser/checkUserName';
  private checkStudentEmailURL = 'AdminUser/checkEmailAddress';
  private checkGradebookID = 'Student/checkGradebookID';

  constructor(private httpClient: HttpClient) { }

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
