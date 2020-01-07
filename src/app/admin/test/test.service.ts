import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {}

  testURI: string = 'Test/getRecords/1';

  // currentExam = this.getExams()

  getTest() {
    return this.http.get(this.testURI)
            .pipe(
              catchError(err => err),
              map((v: [{test_name: string, test_id: string}]) => { console.log(v) ;return { testName: v[0].test_name , testId: v[0].test_id } }),
                  )
  }

}
