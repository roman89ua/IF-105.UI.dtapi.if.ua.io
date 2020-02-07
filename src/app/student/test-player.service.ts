import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestPlayerService {

  constructor(private http: HttpClient, private authservice: AuthService) { }
  getTestInfo(testId: number) {
    return this.http.get(`Test/getRecords/${testId}`);
  }

  getTestDetails(testId: number) {
    return this.http.get(`testDetail/getTestDetailsByTest/${testId}`);
  }
  
  getQuestionByLevel(test_id: number, level: number, tasks: number) {
    return this.http.get(`question/getQuestionIdsByLevelRand/${test_id}/${level}/${tasks}`);
  }
  getLog(testId: number) {
    // return of(null);
    return this.authservice.getCurrentUser()
      .pipe(
        switchMap(user =>
           this.http.get(`Log/startTest/${user.id}/${testId}`)
        )
      )
  }
  getQuestions(questionIds: any) {
    return this.http.post('EntityManager/getEntityValues', {entity: 'Question', ids: questionIds });
  }
  getAnswer(questionId: any) {
    return this.http.get(`SAnswer/getAnswersByQuestion/${questionId}`);
  }
  getQuestionList(testId: number) {
    return this.getLog(testId)
    .pipe(
      switchMap(() => {
        return this.getTestDetails(testId)
      }),
      switchMap((questionDetails: any) => {
        const questionsByLevel$ = questionDetails
          .map(({ level, tasks }) => this.getQuestionByLevel(testId, level, tasks));
        return forkJoin(questionsByLevel$);
      }),
      switchMap((qwestionsByLevel: any) => {
        const questionIds = qwestionsByLevel.flat().map(({question_id}) => question_id);
        return this.getQuestions(questionIds);
      }),
      switchMap((questions: any) => {
        const answers$ = questions
          .filter(question => question.type < 3)
          .map(({question_id}) => this.getAnswer(question_id));
        return forkJoin([of(questions), forkJoin(answers$)]);
      }),
      map(([questions, answers]) => {
        const flattenAnswers = (answers as any).flat();

        return questions.map((question: any) => {
          return {
            ...question,
            answers: flattenAnswers.filter(({ question_id }) => question_id === question.question_id),
          }
        });
      })
    )
  }

  checkTest(testData: any) {
    return this.http.post('SAnswer/checkAnswers', testData)
  }
}
