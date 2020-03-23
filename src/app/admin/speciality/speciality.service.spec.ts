import { TestBed } from '@angular/core/testing';

import { SpecialityService } from './speciality.service';

describe('SpecialityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialityService = TestBed.get(SpecialityService);
    expect(service).toBeTruthy();
  });
});
