import { TestBed } from '@angular/core/testing';

import { LevelResultsChartService } from './level-results-chart.service';

describe('LevelResultsChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelResultsChartService = TestBed.get(LevelResultsChartService);
    expect(service).toBeTruthy();
  });
});
