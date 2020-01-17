import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, IAnswer } from './question';
import { tap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getTestQuestion(id: number) {
    return this.http.get(`question/getRecordsRangeByTest/${id}/20/0`)
  }

  getQuestionAnswers(id: number) {
    return this.http.get('answer/getAnswersByQuestion/' + id)
  }

  deleteQuestion(id: number) {
    return this.http.get('question/del/' + id)
  }

  deleteAnswer(id: number) {
    return this.http.get('answer/del/' + id)
  }

  deleteAnswerCollection(answers: IAnswer[]) {
    const deleteAnswerObservables = answers.map(answer => this.deleteAnswer(answer.answer_id))
    return forkJoin(deleteAnswerObservables)
  }

  addNewQuestion(data: IQuestion) {
    return this.http.post('question/insertData', data)
  }
  
  addNewAnswer(data: IAnswer) {
    return this.http.post('answer/insertData', data)
  }

  addAnswerCollection(answers, questionId) {
    answers.forEach((answer) => { 
      //need to refactor
      delete answer.answer_id 
      delete answer.error
    })  
    const obsArray = answers.map((answer) => this.addNewAnswer({...answer, question_id: questionId}));
    return forkJoin(obsArray)
  }

  toBase64(file: File) {
    return new Observable((observer) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);
 
      reader.onload = () => observer.next(reader.result);
      reader.onerror = err => observer.error(err);
  
    })
  } 
}
