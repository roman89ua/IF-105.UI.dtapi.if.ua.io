import { Injectable } from '@angular/core';
import { IQuestion, IAnswer } from '../../admin/questions/questions';
import { ApiService } from '../services/api.service';
import { QuestionService } from '../../admin/questions/questions.service';
import { mergeMap, map, } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  test_id: number;
  listQuestionByTest: IQuestion[];

  constructor(
    private apiService: ApiService,
  ) { }

  uploadQuestions(listQuestionByTest: IQuestion[], test_id: number, level: number) {
    this.setTestId(listQuestionByTest, test_id);
    this.setLevelQuestions(listQuestionByTest, level);
    return forkJoin(
      listQuestionByTest.map(question => {
        const answers: any = JSON.parse(question.answers.toString());
        delete question.answers;
        delete question.question_id;
        return this.apiService.createEntity('Question', question).pipe(mergeMap( (result) => {
          return forkJoin(
            answers.map((answer) => {
              delete answer.answer_id;
              answer.question_id = result[0].question_id;
              return this.apiService.createEntity('Answer', answer);
            })
          )
        })) 
      })
    ).subscribe();
  }

  setLevelQuestions(listQuestionByTest: IQuestion[], level: number) {
    listQuestionByTest.map( question => question.level = level );
  }

  setTestId(listQuestionByTest: IQuestion[], test_id: number) {
    listQuestionByTest.map( question => question.test_id = test_id );
  }
  delQuestionId(listQuestionByTest: IQuestion[]) {
    listQuestionByTest.map( question => delete question.question_id);
  }

}
