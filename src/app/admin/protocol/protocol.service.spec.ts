import { TestBed } from '@angular/core/testing';

import { ProtocolService } from './protocol.service';

describe('ProtocolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProtocolService = TestBed.get(ProtocolService);
    expect(service).toBeTruthy();
  });
});
