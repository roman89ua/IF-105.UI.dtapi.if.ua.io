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

  getEntity(entity: string, id?: number): Observable<any> {
    if (id === undefined) {
      return this.http.get(`${this.apiURI}/${entity}/getRecords`);
    }

    return this.http.get(`${this.apiURI}/${entity}/getRecords/${id}`);
  }
  createEntity(entity: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}/${entity}/insertData`, payload);
  }
  delEntity(entity: string, id: number): Observable<any> {
    return this.http.get(`${this.apiURI}/${entity}/del/${id}`);
  }
  updEntity(entity: string, payload, id: number): Observable<any> {
    return this.http.post(`${this.apiURI}/${entity}/update/${id}`, payload);
  }
  getEntityByAction(entity: string, action: string, id: number): Observable<any> {
    return this.http.get(`${this.apiURI}/${entity}/${action}/${id}`);
  }
  /** Returns JSON with entities that have provided id */
  getByEntityManager(entity: string, idsList: Array<number>) {
    const data = {
      entity: entity,
      ids: idsList
    };
    return this.http.post(`${this.apiURI}/EntityManager/getEntityValues`, data);
  }
  /** GET range records with optional parameters: fieldName and direction (1 or -1) using for sorting data */
  getRecordsRange(entity: string, limit: number, offset: number, fieldName: string = null, direction: number = 1): Observable<any> {
    let url: string;
    if (fieldName) {
      url = `${entity}/getRecordsRange/${limit}/${offset}/${fieldName}/${direction}`;
    } else {
      url = `${entity}/getRecordsRange/${limit}/${offset}}`;
    }
    return this.http.get(url);
  }
}
