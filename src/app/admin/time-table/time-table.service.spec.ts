import { TestBed } from '@angular/core/testing';

import { TimeTableService } from './time-table.service';

describe('TimeTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeTableService = TestBed.get(TimeTableService);
    expect(service).toBeTruthy();
  });
});
