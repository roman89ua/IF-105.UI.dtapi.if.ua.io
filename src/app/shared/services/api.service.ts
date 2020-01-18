import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // in case of interseptior missing add url into apiURI
  apiURI = '';

  constructor(private http: HttpClient) { }

  getEntity(entity, action): Observable<any> {
    const url = `${this.apiURI}/${entity}/${action}`;
    return this.http.get(url);
  }
  postEntity(entity, action, body): Observable<any> {
    const url = `${this.apiURI}/${entity}/${action}`;
    return this.http.post(url, body);
  }
  delEntity(entity, action, id): Observable<any> {
    const url = `${this.apiURI}/${entity}/${action}/${id}`;
    return this.http.get(url);
  }
  updEntity(entity, action, body, id): Observable<any> {
    const url = `${this.apiURI}/${entity}/${action}/${id}`;
    return this.http.post(url, body);
  }
}

