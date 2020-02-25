import { Injectable } from '@angular/core';
import { IQuestion, IAnswer } from '../../admin/questions/questions'
import { ApiService } from '../services/api.service';
import { QuestionService } from '../../admin/questions/questions.service';
import { mergeMap, mergeMapTo, concatMap, concatMapTo, map, mergeAll, concatAll, combineAll } from 'rxjs/operators';
import { Observable, from, merge, combineLatest, forkJoin } from 'rxjs';

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
    forkJoin( listQuestion.map(question => {
      return this.questionServise.getQuestionAnswers(question.question_id)
      .pipe(map ((item: IAnswer[]) => question.answers = item))
    })).subscribe({complete: () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(listQuestion, null, 2)], {
        type: "text/json"
      }));
      a.setAttribute("download", "data.json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }})
  }
}
