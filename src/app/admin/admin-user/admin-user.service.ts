import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminUserService {

  constructor(private http: HttpClient) { }

  checkUsername(username: string) {
    return this.http.get(`AdminUser/checkUserName/${username}`);
  }
  checkUserEmail(email: string) {
    return this.http.get(`AdminUser/checkEmailAddress/${email}`);
  }
}
