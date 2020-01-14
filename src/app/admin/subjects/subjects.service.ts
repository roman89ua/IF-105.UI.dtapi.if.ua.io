import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  
  constructor(private http: HttpClient) {}
  creatSubject(body) {
    return this.http.post('Subject/insertData', body);

  }
  readSubjects() {
    return this.http.get('Subject/getRecords');
  }

  updateSubject(id: number, budy){
    return this.http.post(`Subject/update/${id}`, budy);
  }

  deleteSubject(id: number) {
    return this.http.get(`Subject/del/${id}`);
  }
}
