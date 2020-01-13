import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from './question';
import { tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getTestQuestion() {
    return this.http.get('question/getRecordsRangeByTest/1/50/0')
      .pipe(tap(res=>console.log(res)))
  }

  getQuestionAnswers(id) {
    return this.http.get('answer/getAnswersByQuestion/' + id)
      .pipe(tap(res=>console.log(res)))
  }

  checkQuestionAnswers(id) {
    return this.http.get('answer/getAnswersByQuestion/' + id)
    .pipe(
      tap(res=>console.log(res))
      ,map((res: any) => {             //FIX
      if (res.response === 'no records') {
        console.log(res, 'NO RECORDS')
        return false
      }
      else {
        console.log(res, 'RECORDS')
        return true
      }
    }))
  }

  deleteQuestion(id) {
    return this.http.get('question/del/' + id)
      .pipe(tap(res=>console.log(res)))
  }

  deleteAnswer(id) {
    return this.http.get('answer/del/' + id)
      .pipe(tap(res=>console.log(res, '[DELETE QUESTION]')))
  }

  deleteAnswerCollection(answers) {
    const deleteAnswerObservables = answers.map(answer => this.deleteAnswer(answer.answer_id))
    return forkJoin(deleteAnswerObservables)
  }

  addNewQuestion(data) {
    return this.http.post('question/insertData', data)
      .pipe(tap(res=>console.log(res)))
  }

  
  addNewAnswer(data) {
    return this.http.post('answer/insertData', data)
      .pipe(tap(res=>console.log(res)))
  }

  addAnswerCollection(answers, questionId) {
    console.log(questionId)
    answers.forEach((answer) => delete answer.id)
    // console.log({...answer, question_id: 14})
    const obsArray = answers.map((answer) => this.addNewAnswer({...answer, question_id: questionId}));
    console.log(obsArray, '[OBS ARRAY]')
    return forkJoin(obsArray)
  }
}
