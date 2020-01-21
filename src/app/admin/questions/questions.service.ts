import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, IAnswer } from './questions';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getTestQuestions(id: number, limit: number, offset: number) {
    return this.http.get(`question/getRecordsRangeByTest/${id}/${limit}/${offset}`)
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
    const obsArray = answers.map((answer) => {
      answer.true_answer = answer.true_answer ? 1 : 0 
      return this.addNewAnswer({...answer, question_id: questionId})
    });
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
    
  getTestQuestionsCount(id) {
    return this.http.get(`question/countRecordsByTest/${id}`)
      .pipe(
        map( (res: { numberOfRecords: number }) => +res.numberOfRecords ) 
      )
  }
}
