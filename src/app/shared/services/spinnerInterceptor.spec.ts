import { TestBed, async, fakeAsync, tick, flush } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { SpinnerInterceptor } from './spinner.interceptor';
import { ApiService } from './api.service';



fdescribe(`SpinnerInterceptor`, () => {
    let httpMock: HttpTestingController;
    let service: ApiService;
    let interceptor: SpinnerInterceptor;
    let spinnerServiceSpy: any;

    beforeEach(() => {
        spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['show', 'hide']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ApiService,
                SpinnerInterceptor,
                { provide: SpinnerService, useValue: spinnerServiceSpy },
                { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
            ],
        });
        interceptor = TestBed.get(SpinnerInterceptor);
        service = TestBed.get(ApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should call spinner service show', () => {
        service.getCountRecords('Faculty')
        .subscribe(() => {
             expect(spinnerServiceSpy.show).toHaveBeenCalledTimes(1);
            });
        httpMock.expectOne('Faculty/countRecords').flush({});
        httpMock.verify();
    });

    it('should call  spinner service hide', () => {
        service.getCountRecords('Faculty')
        .subscribe();
        httpMock.expectOne('Faculty/countRecords').flush({}, { status: 200, statusText: '' });
        httpMock.verify();
        expect(spinnerServiceSpy.hide).toHaveBeenCalledTimes(1);
    });
});
