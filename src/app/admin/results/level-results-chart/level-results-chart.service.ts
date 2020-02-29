import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelResultsChartService {

  constructor(private apiService: ApiService) { }
  /** returns data for questions with true answers */
  getCorrectAnswers(data) {
    const questionsArr = JSON.parse(data).filter(element =>
      element.true === 1
    ).map(element => element.question_id);
    return (questionsArr.length > 0) ? this.apiService.getByEntityManager('Question', questionsArr) : of([]);
  }
  /** returns TestDetail for test with provided id */
  getTestDetail(id) {
    return this.apiService.getEntityByAction('TestDetail', 'getTestDetailsByTest', id);
  }
  /** returns object with counted true answers for each level */
  getTrueAnswersbyLevel(testDetails, trueAnswers): Array<object> {
    return testDetails.map(
      (element, index) => ({
        level: index++,
        task: (trueAnswers.reduce((acc, cur) => cur.level === element.level ? ++acc : acc, 0))
      })
    );
  }
  /** returns array with labels for each level */
  getLabelsArr(TestDetail): Array<string> {
    return TestDetail.map(element => {
      return element.level + ' рівень';
    });
  }
  /** returns array with maximum rate for each tasks level */
  getMaxRatesArr(TestDetail): Array<number> {
    return TestDetail.map(element => {
      return +element.tasks * +element.rate;
    });
  }
  /** returns array with rates on each level for true answers */
  getRatesArr(TestDetail, trueAnswers): Array<number> {
    return trueAnswers.map((item, index) => item.task * TestDetail[index].rate);
  }
}
