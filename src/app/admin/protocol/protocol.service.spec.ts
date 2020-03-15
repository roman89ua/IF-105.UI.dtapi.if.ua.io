import { TestBed } from '@angular/core/testing';
import { ProtocolService } from './protocol.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('getStudentFullName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return "Kravtsiv Kostiantyn Igorovych"', () => {
    const studentObject = {
      student_surname: 'Kravtsiv',
      student_name: 'Kostiantyn',
      student_fname: 'Igorovych'
    };
    const service: ProtocolService = TestBed.get(ProtocolService);
    const result = service.getStudentFullName(studentObject);
    expect(result).toBe('Kravtsiv Kostiantyn Igorovych');
  });
});
