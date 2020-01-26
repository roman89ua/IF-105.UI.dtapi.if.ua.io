import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentsService {

  private checkStudentNameURL = 'AdminUser/checkUserName';
  private checkStudentEmailURL = 'AdminUser/checkEmailAddress';

  private checkGradebookIdURL = 'Student/checkGradebookID';

  constructor(private httpClient: HttpClient) {}

  checkUsername(username: string) {
    return this.httpClient.get(`${this.checkStudentNameURL}/${username}`);
  }

  checkUserEmail(email: string) {
    return this.httpClient.get(`${this.checkStudentEmailURL}/${email}`);
  }

  checkGradebookID(gradebookID: string) {
    return this.httpClient.get(`${this.checkGradebookIdURL}/${gradebookID}`);
  }
}
