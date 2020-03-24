import { TestBed } from '@angular/core/testing';
import { ProtocolService } from '../protocol.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProtocolServiceTestBed } from './ProtocolServiceTestBed.mock';
import { MockedData } from './mockedProtocolServiceData.mock';

describe('getTests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return tests data', () => {
    const testBed = new ProtocolServiceTestBed().createTestBed();
    const result = testBed.getTests([1]);
    expect(result).toBe('Tests');
  });

  it('should return observable with null value if no id is provided', () => {
    const testBed = new ProtocolServiceTestBed().createTestBed();
    const result = testBed.getTests([]);
    expect(result.value).toBe(null);
  });
});

describe('getUsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return users data', () => {
    const testBed = new ProtocolServiceTestBed().createTestBed();
    const result = testBed.getUsers([1]);
    expect(result).toBe('Students');
  });

  it('should return observable with null value if no id is provided', () => {
    const testBed = new ProtocolServiceTestBed().createTestBed();
    const result = testBed.getUsers([]);
    expect(result.value).toBe(null);
  });
});

describe('getStudentFullName', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return student full name', () => {
    const result = TestBed.get(ProtocolService).getStudentFullName(mockedData.studentObject);
    expect(result).toBe('Kravtsiv Kostiantyn Igorovych');
  });
});

describe('getUserName', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should return user name', () => {
    const result = TestBed.get(ProtocolService).getUserName(mockedData.users, '153');
    expect(result).toBe('Гринюк Роман Михайлович');
  });

  it('should return undefined if there is no such user id', () => {
    const result = TestBed.get(ProtocolService).findUserObj(mockedData.users, '10');
    expect(result).not.toBeDefined();
  });

  it('should return undefined if no id is provided', () => {
    const result = TestBed.get(ProtocolService).findUserObj(mockedData.users);
    expect(result).not.toBeDefined();
  });
});

describe('getUserIds', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return unique user ids', () => {
    const result = TestBed.get(ProtocolService).getUserIds(mockedData.logs);
    expect(result).toEqual([159, 155]);
  });

  it('should return empty array if no id is provided', () => {
    const result = TestBed.get(ProtocolService).getUserIds([]);
    expect(result).toEqual([]);
  });
});

describe('getTestIds', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return test ids', () => {
    const result = TestBed.get(ProtocolService).getTestIds(mockedData.tests);
    expect(result).toEqual([1, 4, 5, 6]);
  });

  it('should return empty array if id is not provided', () => {
    const result = TestBed.get(ProtocolService).getTestIds([]);
    expect(result).toEqual([]);
  });
});

describe('findTestName', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return test name', () => {
    const result = TestBed.get(ProtocolService).findTestName(mockedData.tests, '4');
    expect(result).toBe('Вступ');
  });

  it('should return undefined if there is no such test id', () => {
    const result = TestBed.get(ProtocolService).findTestName(mockedData.tests, '10');
    expect(result).not.toBeDefined();
  });

  it('should return undefined if id is not provided', () => {
    const result = TestBed.get(ProtocolService).findTestName(mockedData.tests);
    expect(result).not.toBeDefined();
  });
});

describe('findUserObj', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return user object with provided id', () => {
    const result = TestBed.get(ProtocolService).findUserObj(mockedData.users, '153');
    expect(result).toEqual(new MockedData().users[0]);
  });

  it('should return undefined if there is no such user id', () => {
    const result = TestBed.get(ProtocolService).findUserObj(mockedData.users, '10');
    expect(result).not.toBeDefined();
  });

  it('should return undefined if id is not provided', () => {
    const result = TestBed.get(ProtocolService).findUserObj(mockedData.users);
    expect(result).not.toBeDefined();
  });
});

describe('getEndDate', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return end date with hours set to 23-59-59', () => {
    const result = TestBed.get(ProtocolService).getEndDate(new Date(mockedData.date.endDate));
    expect(result).toEqual(new Date(mockedData.properEndDate));
  });
});

describe('filterByDate', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return logs filtered by date', () => {
    const result = TestBed.get(ProtocolService).filterByDate(mockedData.logs, mockedData.date);
    expect(result).toEqual([mockedData.logs[1], mockedData.logs[2]]);
  });
});

describe('getProtocolOjb', () => {
  const mockedData = new MockedData();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should return combined object from received data', () => {
    const result = TestBed.get(ProtocolService).getProtocolObj(mockedData.data);
    expect(result).toEqual(mockedData.protocolObjects);
  });
});

