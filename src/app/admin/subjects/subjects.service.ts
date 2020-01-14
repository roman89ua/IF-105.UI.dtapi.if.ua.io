import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  
  constructor(private http: HttpClient) {}
  // getSubjects() {
  //   return this.http.get('Subject/getRecords');
  // }

  // deleteSubject(id: number) {
  //   return this.http.get(`Subject/del/${id}`);
  // }

  // insertSubject(body) {
  //   return this.http.post('Subject/insertData', body);

  // }
  // editSubject(){

  // }
}
