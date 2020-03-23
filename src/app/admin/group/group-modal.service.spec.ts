import { TestBed } from '@angular/core/testing';

import { GroupModalService } from './group-modal.service';

describe('GroupModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupModalService = TestBed.get(GroupModalService);
    expect(service).toBeTruthy();
  });
});
