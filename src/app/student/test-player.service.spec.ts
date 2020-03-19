import { TestBed } from '@angular/core/testing';
import { TestPlayerService } from './test-player.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../shared/auth.service';
import { of, } from 'rxjs';
import {
   mockTest,
   mockLogin,
   expectData,
   error,
   mockTestDetails,
   getQuestionIdsByLevelRandMock,
   entityValuesMock,
   getAnswerByQuestionMock,
   listQuestionsMock,
   logStartTestErrorMock} from './mockTestPlayerData';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('TestPlayerServiceService', () => {

  let testPlayerService: TestPlayerService;
  let httpTestingController: HttpTestingController;

  let authServiceSpy: any;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestPlayerService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    testPlayerService = TestBed.get(TestPlayerService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    const service: TestPlayerService = TestBed.get(TestPlayerService);
    expect(service).toBeTruthy();
  });

  it('should fetch TestDetails by id', () => {
    testPlayerService.getTestDetails(1)
      .subscribe((response: any) => {
        expect(response).toBeTruthy('No test returned');
        expect(response.test_id).toBe(1);
        expect(response.test_name).toEqual('Фінальний тест');
      });
    const req = httpTestingController.expectOne('testDetail/getTestDetailsByTest/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTest);
  });


  it('should start test if response - ok', () => {
    authServiceSpy.getCurrentUser.and.returnValue(of(mockLogin));
    testPlayerService.getLog(62)
      .subscribe((response: any) => {
        expect(response).toBeTruthy();
        expect(response.response).toEqual(expectData.response);
      });

    const req = httpTestingController.expectOne(`Log/startTest/${mockLogin.id}/62`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectData);
  });


  it('should give an error if user passing test', () => {
    authServiceSpy.getCurrentUser.and.returnValue(of(mockLogin));
    testPlayerService.getLog(62)
      .subscribe(() =>  {} , (err: HttpErrorResponse) => {
        expect(err.error).toEqual(error.response);
      });
    const req = httpTestingController.expectOne(`Log/startTest/${mockLogin.id}/62`);
    expect(req.request.method).toEqual('GET');
    req.flush(error.response, {status: 400, statusText: 'Bad Request'});
  });

  it('should return list of questions', () => {
    const test = 62;
    authServiceSpy.getCurrentUser.and.returnValue(of(mockLogin));
    testPlayerService.getQuestionList(test)
      .subscribe((questions) => {
        expect(questions[0]).toEqual(listQuestionsMock);
       });
    const startTest = httpTestingController.expectOne({
      method: 'GET',
      url: `Log/startTest/${mockLogin.id}/${test}`
    });
    startTest.flush(expectData);

    const testDetail = httpTestingController.expectOne({
      method: 'GET',
      url: `testDetail/getTestDetailsByTest/${test}`
    });
    testDetail.flush(mockTestDetails);

    const questionByLevel = httpTestingController.expectOne({
      method: 'GET',
      url:  `question/getQuestionIdsByLevelRand/${test}/${mockTestDetails[0].level}/${mockTestDetails[0].tasks}`
    });
    questionByLevel.flush(getQuestionIdsByLevelRandMock);

    const getEntityValues =  httpTestingController.expectOne({
      method: 'POST',
      url: 'EntityManager/getEntityValues',
    });
    expect(getEntityValues.request.body).toEqual({ entity: 'Question', ids: [entityValuesMock[0].question_id] });
    getEntityValues.flush(entityValuesMock);

    const getAnswersByQestion = httpTestingController.expectOne({
      method: 'GET',
      url: `SAnswer/getAnswersByQuestion/${getQuestionIdsByLevelRandMock[0].question_id}`,
    });
    getAnswersByQestion.flush(getAnswerByQuestionMock);
  });

  it('should thrown an error if user started  the test that isn\'t allowed for him', () => {
    const test = 13;
    authServiceSpy.getCurrentUser.and.returnValue(of(mockLogin));
    testPlayerService.getQuestionList(test)
      .subscribe(() => {},
      (err) => {
        expect(err).toEqual(logStartTestErrorMock.response);
      });
    const startTest = httpTestingController.expectOne({
      method: 'GET',
      url: `Log/startTest/162/${test}`
    });
    startTest.flush(logStartTestErrorMock.response, {status: 400, statusText: 'Bad Request'});
  });
});
