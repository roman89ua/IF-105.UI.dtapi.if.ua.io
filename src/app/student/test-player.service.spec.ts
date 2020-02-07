import { TestBed } from '@angular/core/testing';

import { TestPlayerService } from './test-player.service';

describe('TestPlayerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestPlayerService = TestBed.get(TestPlayerService);
    expect(service).toBeTruthy();
  });
});
