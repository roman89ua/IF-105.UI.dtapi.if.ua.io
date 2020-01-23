import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, IAnswer } from './questions';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

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
  
  getTestQuestion(id: number) {
    return this.http.get(`question/getRecordsRangeByTest/${id}/20/0`);
  }

  deleteAnswerCollection(answers: IAnswer[]) {
    const deleteAnswerObservables = answers.map(answer => this.apiService.delEntity('Answer', answer.answer_id));
    return forkJoin(deleteAnswerObservables);
  }

  addAnswerCollection(answers, questionId) {
    const obsArray = answers.map((answer) => {
      answer.true_answer = answer.true_answer ? 1 : 0 
      return this.addNewAnswer({...answer, question_id: questionId})
    });
    return forkJoin(obsArray)
  }

  getQuestion(id) {
    return this.http.get(`question/getRecords/${id}`)
  }

  updateQuestion(id, questionData: any) {
    return this.http.post(`question/update/${id}`, questionData);
  }

  updateAnswer(answer: any) {
    const id = answer.answer_id;
    delete answer.answer_id;
    return this.http.post(`answer/update/${id}`, answer);
  }

  updateAnswerCollection(answers, questionId) {
    const obsArray = answers.map((answer) => {
      answer.true_answer = answer.true_answer ? 1 : 0 
      return this.updateAnswer({...answer, question_id: questionId})
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
