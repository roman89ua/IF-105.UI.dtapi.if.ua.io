import { TestBed } from '@angular/core/testing';

import { StudentInfoService } from './student-info.service';

describe('StudentInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentInfoService = TestBed.get(StudentInfoService);
    expect(service).toBeTruthy();
  });
});
