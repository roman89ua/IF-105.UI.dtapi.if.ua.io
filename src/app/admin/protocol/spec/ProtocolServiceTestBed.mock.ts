import { TestBed } from '@angular/core/testing';
import { ProtocolService } from '../protocol.service';

export class ProtocolServiceTestBed {

  createTestBed() {
    const testBed = TestBed.get(ProtocolService);
    spyOn(testBed.apiService, 'getByEntityManager')
      .withArgs('Test', [1]).and.returnValue('Tests')
      .withArgs('Student', [1]).and.returnValue('Students');
    return testBed;
  }

}
