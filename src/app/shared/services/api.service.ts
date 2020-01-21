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
    else {
      // in case to get only one record from database by id
      return this.http.get(`${this.apiURI}/${entity}/getRecords/${id}`);
    }
  }
  postEntity(entity: string, payload): Observable<any> {
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
// import {HttpClient} from '@angular/common/http';
// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {HttpHeaders} from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class GroupService {
//   constructor(private httpClient: HttpClient) {
//   }

  /** GET all records */
  // public getRecords(entity: string): Observable<any> {
  //   const url = `${entity}/getRecords`;
  //   return this.httpClient.get(url);
  // }

  /** GET one record for id */
  // public getRecord(entity: string, id: number): Observable<any> {
  //   const url = `${entity}/getRecords/${id}`;
  //   return this.httpClient.get(url);
  // }

  /** GET range records with optional parameters: fieldName and direction (1 or -1) using for sorting data */
  // public getRecordsRange(entity: string,limit: number, offset: number,fieldName: string = null, direction: number = 1 ): Observable<any> {
  //   let url: string;
  //   if (fieldName) {
  //     url = `${entity}/getRecordsRange/${limit}/${offset}/${fieldName}/${direction}`;
  //   } else {
  //     url = `${entity}/getRecordsRange/${limit}/${offset}}`;
  //   }
  //   return this.httpClient.get(url);
  // }

  /** POST Add new entity */
  // public insertData(entity: string, data: any): Observable<any> {
  //   const url = `${entity}/insertData`;
  //   return this.httpClient.post(url, data, httpOptions);
  // }

  /** DELETE(GET) Entity for id */
  // public del(entity: string, id: number): Observable<any> {
  //   const url = `${entity}/del/${id}`;
  //   return this.httpClient.get(url);
  // }

  /** POST Update item for id */
  // public update(entity: string, id: number, data: any): Observable<any> {
  //   const url = `${entity}/update/${id}`;
  //   return this.httpClient.post(url, data, httpOptions);
  // }

  /** Method only for group */
  /** GET Get groups by speciality (action: getGroupsBySpeciality) or faculty (action: getGroupsByFaculty) */
  // public getGroups(action: string, id: number): Observable<any> {
  //   const url = `group/${action}/${id}`;
  //   return this.httpClient.get(url);
  // }

  /** Method only for TIME TABLE */
  /** GET Get time table by subject (action: getTimeTablesForSubject/) or group (action: getTimeTablesForGroup) */
  // public getTimeTable(action: string, id: number): Observable<any> {
  //   const url = `timeTable/${action}/${id}`;
  //   return this.httpClient.get(url);
  // }

  /** ENTITY MANAGER */

  /** POST  Get records by entity sending JSON with entity and id's ({"entity":"Subject", "ids":[1,2,3,4,5]} */
  /** Entity must begin from capital letter) */
//   public getByEntity(entityName: string, idsList: Array<number>) {
//     const url = `EntityManager/getEntityValues`;
//     const data = {
//       entity: entityName,
//       ids: idsList
//     };
//     return this.httpClient.post(url, data);
//   }
// }

