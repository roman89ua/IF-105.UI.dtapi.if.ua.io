import { TestBed } from '@angular/core/testing';
import { LevelResultsChartService } from '../level-results-chart.service';

export class ChartServiceTestBed {

  createTestBed() {
    const testBed = TestBed.get(LevelResultsChartService);
    spyOn(testBed.apiService, 'getByEntityManager')
      // tslint:disable-next-line:quotemark
      .withArgs('Question', ["23", "48", "50"]).and.returnValue(true);
    return testBed;
  }
}

