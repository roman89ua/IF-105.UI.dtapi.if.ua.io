import { Injectable } from '@angular/core';
import { IQuestion, IAnswer } from '../../admin/questions/questions'
import { ApiService } from '../services/api.service';
import { QuestionService } from '../../admin/questions/questions.service';
import { mergeMap, mergeMapTo, concatMap, concatMapTo, map, mergeAll, concatAll, combineAll } from 'rxjs/operators';
import { Observable, from, merge, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExportService {
  test_id: number;
  listQuestionByTest: IQuestion[];
  listAnswersByQuestion: IAnswer[];

  constructor( private apiService: ApiService,
    private questionServise: QuestionService ) { }

  getQuestionsByTest(id: number) {
    this.questionServise.getTestQuestionsCount(id).pipe(mergeMap( (result: number) => {
      return this.questionServise.getTestQuestions(id, result, 0).pipe();
    })).subscribe( (result: IQuestion[]) => {
      this.getQuestionsWithAnswers(result);
    });
  }
  getQuestionsWithAnswers(listQuestion: IQuestion[]) {
    from(listQuestion).pipe(mergeMap( (result) => {
     return this.questionServise.getQuestionAnswers(result.question_id).pipe(map((item: IAnswer[]) => result.answers = item));
    }), combineAll()).subscribe(() => { 
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(listQuestion, null, 2)], {
        type: "text/json"
      }));
      a.setAttribute("download", "data.json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
