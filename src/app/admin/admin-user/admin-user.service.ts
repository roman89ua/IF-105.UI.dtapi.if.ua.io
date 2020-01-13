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

  insertUser(body) {
    return this.http.post('AdminUser/insertData', body);
  }
}
