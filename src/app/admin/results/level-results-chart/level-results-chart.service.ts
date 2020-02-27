import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

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
    return this.apiService.getByEntityManager('Question', questionsArr);
  }
  /** returns TestDetail for test with provided id */
  getTestDetail(id) {
    return this.apiService.getEntityByAction('TestDetail', 'getTestDetailsByTest', id);
  }
  /** returns object with counted true answers for each level */
  getTrueAnswersbyLevel(testDetails, trueAnswers): Array<object> {
    const arr = [];
    let i = 0;
    testDetails.forEach(element => {
      i++ , arr.push(
        ({
          level: i,
          task: (trueAnswers.reduce((acc, cur) => cur.level === element.level ? ++acc : acc, 0)),
        })
      );
    });
    return arr;
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
    const array = [];
    for (let i = 0; i < trueAnswers.length; i++) {
      array.push(trueAnswers[i].task * TestDetail[i].rate);
    }
    return array;
  }
}

