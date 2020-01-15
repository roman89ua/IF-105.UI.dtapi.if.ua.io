import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminUserService {

  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get('AdminUser/getRecords');
  }

  deleteUser(id: number) {
    return this.http.get(`AdminUser/del/${id}`);
  }

  insertUser(body: any) {
    return this.http.post('AdminUser/insertData', body);
  }
  updateUser(body: any) {
    const data = {
      username: body.username,
      email: body.email,
      password: body.password,
      password_confirm: body.password_confirm}
    return this.http.post(`AdminUser/update/${body.id}`, data);
  }

  checkUsername(username: string) {
    return this.http.get(`AdminUser/checkUserName/${username}`);
  }
  checkUserEmail(email: string) {
    return this.http.get(`AdminUser/checkEmailAddress/${email}`);
  }
}
