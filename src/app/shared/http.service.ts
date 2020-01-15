import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class HttpService {
  
  constructor(private httpClient: HttpClient) {}

  /** GET all records*/
  public getRecords(entity: string): Observable<any> {
    const url = `${entity}/getRecords`;
    return this.httpClient.get(url);
  }
    /** GET one record for id*/
    public getRecord(entity: string, id: number): Observable<any> {
      const url = `${entity}/getRecords/${id}`;
      return this.httpClient.get(url);
    }
    /** GET range records with optional parameters: fieldName and direction (1 or -1) using for sorting data*/
    public getRecordsRange(entity: string, limit: number, offset: number, fieldName: string = null, direction: number = 1): Observable<any> {
      let url: string;
      if (fieldName) {
        url = `${entity}/getRecordsRange/${limit}/${offset}/${fieldName}/${direction}`;
      }
      else  {
        url = `${entity}/getRecordsRange/${limit}/${offset}}`;
      }
      
      return this.httpClient.get(url);
    }
    /** POST Add new entity */
    public insertData(entity: string, data: any): Observable<any> {
      const url = `${entity}/insertData`;
      return this.httpClient.post(url,data, httpOptions);
    }
    /** DELETE(GET) Entity for id */
    public del(entity: string, id: number): Observable<any> {
      const url = `${entity}/del/${id}`;
      return this.httpClient.get(url);
    }
    /** POST Update item for id */
    public update(entity: string, id: number, data: any): Observable<any> {
      const url = `${entity}/update/${id}`;
      return this.httpClient.post(url,data, httpOptions);
    }
    /** Method only for group */
    /** GET Get groups by speciality (action: getGroupsBySpeciality) or faculty (action: getGroupsByFaculty) */
    public getGroups(action: string, id: number): Observable<any> {
      const url = `group/${action}/${id}`;
      return this.httpClient.get(url);
    }
  /** Method only for TIME TABLE */
    /** GET Get time table by subjects (action: getTimeTablesForSubject/) or by groups (action: getTimeTablesForGroup/) */
    public getTimeTable(action: string, id: number): Observable<any> {
      const url = `timeTable/${action}/${id}`;
      return this.httpClient.get(url);
    }
}
