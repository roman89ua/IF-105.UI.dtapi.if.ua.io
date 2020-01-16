import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // in case of interseptior missing add url into apiURI
  apiURI = '';

  constructor(private http: HttpClient) {}

  getEntity(entity, action) {
    const url = `${this.apiURI}/${entity}/${action}`;
    return this.http.get(url);
  }
  postEntity(entity, action, body) {
    const url = `${this.apiURI}/${entity}/${action}`;
    return this.http.post(url, body);
  }
  delEntity(entity, action, id) {
    const url = `${this.apiURI}/${entity}/${action}/${id}`;
    return this.http.get(url);
  }
  updEntity(entity, action, body, id) {
    const url = `${this.apiURI}/${entity}/${action}/${id}`;
    return this.http.post(url, body);
  }
}
