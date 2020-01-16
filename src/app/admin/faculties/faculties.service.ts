import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Faculty {
  faculty_id?: number;
  faculty_name: string;
  faculty_description: string;
}

@Injectable({ providedIn: 'root' })
export class FacultyService {
  constructor(private http: HttpClient) {}

  addFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>('Faculty/insertData', faculty);
  }

  getAllFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>('Faculty/getRecords');
  }
  removeFaculty(id: number): Observable<void> {
    return this.http.delete<void>(`Faculty/del/${id}`);
  }

  updateFaculty(id: number, faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(`Faculty/update/${id}`, faculty);
  }
}
