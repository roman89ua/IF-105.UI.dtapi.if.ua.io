import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  columnsToDisplay = ['index', 'questionText']

  constructor(private http: HttpClient) { }

  getTestQuestion() {
    return this.http.get('question/getRecordsRangeByTest/1/50/0')
  }

  getQuestionAnswers(id) {
    return this.http.get('answer/getAnswersByQuestion/' + id)
  }
}
