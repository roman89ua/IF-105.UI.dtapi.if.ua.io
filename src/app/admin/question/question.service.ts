import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, IAnswer } from './question';
import { tap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getTestQuestion(id: number) {
    return this.http.get(`question/getRecordsRangeByTest/${id}/20/0`);
  }

  deleteAnswerCollection(answers: IAnswer[]) {
    const deleteAnswerObservables = answers.map(answer => this.apiService.delEntity('Answer', answer.answer_id));
    return forkJoin(deleteAnswerObservables);
  }

  addAnswerCollection(answers, questionId) {
    answers.forEach((answer) => {
      // need to refactor
      delete answer.answer_id;
      delete answer.error;
    });
    const obsArray = answers.map((answer) => this.apiService.createEntity('Answer', { ...answer, question_id: questionId }));
    return forkJoin(obsArray);
  }

  toBase64(file: File) {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => observer.next(reader.result);
      reader.onerror = err => observer.error(err);
    });
  }
}
