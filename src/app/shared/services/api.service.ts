import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // in case of interseptior missing add url into apiURI
  apiURI = '';

  constructor(private http: HttpClient) { }

  getEntity(entity, id?): Observable<any> {
    if (id === undefined) {
      return this.http.get(`${this.apiURI}/${entity}/getRecords`);
    }
    else {
      // in case to get only one record from database by id
      return this.http.get(`${this.apiURI}/${entity}/getRecords/${id}`);
    }
  }
  postEntity(entity, payload): Observable<any> {
    return this.http.post(`${this.apiURI}/${entity}/insertData`, payload);
  }
  delEntity(entity, id): Observable<any> {
    return this.http.get(`${this.apiURI}/${entity}/del/${id}`);
  }
  updEntity(entity, payload, id): Observable<any> {
    return this.http.post(`${this.apiURI}/${entity}/update/${id}`, payload);
  }
}
