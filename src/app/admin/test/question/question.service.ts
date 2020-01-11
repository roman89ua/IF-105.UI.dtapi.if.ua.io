import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from './question';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  columnsToDisplay = ['index', 'questionText']

  constructor(private http: HttpClient) { }

  getTestQuestion() {
    return this.http.get('question/getRecordsRangeByTest/1/50/0')
      .pipe(tap(res=>console.log(res)))
  }

  getQuestionAnswers(id) {
    return this.http.get('answer/getAnswersByQuestion/' + id)
      .pipe(tap(res=>console.log(res)))
  }

  deleteQuestion(id) {
    return this.http.get('question/del/' + id)
      .pipe(tap(res=>console.log(res)))

  }
  addNewQuestion(data) {
    return this.http.post('question/insertData', data)
      .pipe(tap(res=>console.log(res)))
  }
}
