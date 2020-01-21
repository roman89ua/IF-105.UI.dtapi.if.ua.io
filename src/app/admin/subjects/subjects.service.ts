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
<<<<<<< HEAD

  updateSubject(id: number, formData) {
=======
  updateSubject(id: number, formData){
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
    return this.http.post(`Subject/update/${id}`, formData);
  }
  deleteSubject(id: number) {
    return this.http.get(`Subject/del/${id}`);
  }
}
