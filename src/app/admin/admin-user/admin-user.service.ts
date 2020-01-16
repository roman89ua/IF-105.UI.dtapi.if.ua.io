import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateUpdateAdminUser } from './admin-user.interface';

@Injectable()
export class AdminUserService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get('AdminUser/getRecords');
  }

  deleteUser(id: number) {
    return this.http.get(`AdminUser/del/${id}`);
  }

  insertUser(payload: ICreateUpdateAdminUser) {
    return this.http.post('AdminUser/insertData', payload);
  }
  updateUser(id: number, payload: ICreateUpdateAdminUser) {
    return this.http.post(`AdminUser/update/${id}`, payload);
  }

  checkUsername(username: string) {
    return this.http.get(`AdminUser/checkUserName/${username}`);
  }
  checkUserEmail(email: string) {
    return this.http.get(`AdminUser/checkEmailAddress/${email}`);
  }
}
