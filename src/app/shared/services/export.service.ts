import { Injectable } from '@angular/core'
import { IQuestion, IAnswer } from '../../admin/questions/questions';
import { ApiService } from '../services/api.service';
import { QuestionService } from '../../admin/questions/questions.service';
import { mergeMap, map, } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  test_id: number;
  listLevels$: number[];
  listQuestionByTest: IQuestion[];
  listAnswersByQuestion: IAnswer[];

  constructor(
    private apiService: ApiService,
    private questionServise: QuestionService,
    private modalService: ModalService,
  ) {}

  loadQuestionsByTest(id: number, level: number) {
    this.getQuestionsByTest(id)
      .subscribe((listQuestion: IQuestion[]) => {
        const filterListQuestion = this.getQuestionsByLevel(listQuestion, level);
        this.getQuestionsWithAnswers(filterListQuestion).subscribe( {
          complete: () => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(
              new Blob([JSON.stringify(filterListQuestion, null, 2)], {
                type: "text/json"
              })
            );
            a.setAttribute("download", "data.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          },
          error: () => {
            this.modalService.openErrorModal('Помилка завантаження даних');
          }
        });
      });
  }
  private getQuestionsWithAnswers(listQuestion: IQuestion[]): Observable<any> {
    return forkJoin(
      listQuestion.map(question => {
        return this.questionServise
          .getQuestionAnswers(question.question_id)
          .pipe(map((item: IAnswer[]) => (question.answers = JSON.stringify(item))));
      })
    );
  }

  private getQuestionsByTest(id: number): Observable<any> {
    return this.questionServise
      .getTestQuestionsCount(id)
      .pipe(
        mergeMap((result: number) => {
          if (result == 0) {
            return of(null);
          }
          else {
            return this.questionServise.getTestQuestionsAttacment(id, result, 0);
          }
        })
      )
  }

  private getQuestionsByLevel(listQuestionByTest: IQuestion[], level: number): IQuestion[] {
    return level ? listQuestionByTest.filter(question => question.level == level) : listQuestionByTest;
  }

  getLevelsByTest(id_test: number) {
    return this.getQuestionsByTest(id_test).pipe(map( (listQuestion: IQuestion[]) => {
      if (!listQuestion)  {
        return null;
      } else {
        const levels = new Set<number>();
        listQuestion.forEach(question => {
          levels.add(question.level);
        });
        return [...levels];
      }
    } ))
  }
}
