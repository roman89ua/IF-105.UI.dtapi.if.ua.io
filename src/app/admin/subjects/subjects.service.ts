import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  
  constructor(private http: HttpClient) {}

  creatSubject(formData) {
    return this.http.post('Subject/insertData', formData);
  }
  readSubjects() {
    return this.http.get('Subject/getRecords');
  }
  updateSubject(id: number, formData){
    return this.http.post(`Subject/update/${id}`, formData);
  }
  deleteSubject(id: number) {
    return this.http.get(`Subject/del/${id}`);
  }
}
