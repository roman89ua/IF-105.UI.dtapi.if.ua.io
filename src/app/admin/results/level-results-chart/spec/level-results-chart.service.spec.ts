import { TestBed } from '@angular/core/testing';
import { LevelResultsChartService } from '../level-results-chart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartServiceTestBed } from './chartServiceTestBed.mock';
import { ChartData } from './chartData.mock';

describe('sortTestDetailsByLevels', () => {
  const mockedData = new ChartData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return sorted TestDetail', () => {
    const result = TestBed.get(LevelResultsChartService).sortTestDetailsByLevels(mockedData.testDetails);
    expect(result).toEqual(mockedData.sortTestDetails);
  });
});

describe('getLabelsArr', () => {
  const mockedData = new ChartData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return array with labels', () => {
    const result = TestBed.get(LevelResultsChartService).getLabelsArr(mockedData.sortTestDetails);
    expect(result).toEqual(mockedData.labelsArr);
  });
});

describe('getMaxRatesArr', () => {
  const mockedData = new ChartData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return array with max rates', () => {
    const result = TestBed.get(LevelResultsChartService).getMaxRatesArr(mockedData.sortTestDetails);
    expect(result).toEqual(mockedData.maxRates);
  });
});

describe('getCorrectAnswers', () => {
  const mockedData = new ChartData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should execute api call with mocked return', () => {
    const testBed = new ChartServiceTestBed().createTestBed();
    const result = testBed.getCorrectAnswers(mockedData.trueAnswers);
    expect(result).toEqual(true);
  });

  it('should return observable with value of empty array', () => {
    const testBed = new ChartServiceTestBed().createTestBed();
    const result = testBed.getCorrectAnswers(mockedData.falseAnswers);
    expect(result.value).toEqual([]);
  });
});

describe('getRates', () => {
  const mockedData = new ChartData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should execute api call with mocked return', () => {
    const result = TestBed.get(LevelResultsChartService).getRatesArr(mockedData.sortTestDetails, mockedData.correctAnswers);
    expect(result).toEqual(mockedData.ratesArr);
  });
});

describe('getTrueAnswersByLvl', () => {
  const mockedData = new ChartData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return true answers by level', () => {
    const result = TestBed.get(LevelResultsChartService).getTrueAnswersbyLevel(mockedData.testDforRatesByLvl, mockedData.answersDetails);
    expect(result).toEqual(mockedData.ratesByLvl);
  });
});

