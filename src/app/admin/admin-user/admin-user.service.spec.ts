import { TestBed, inject } from '@angular/core/testing';

import { AdminUserService } from './admin-user.service';
import { ICreateUpdateAdminUser, IAdminUser } from './admin-user.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { retryWhen } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

fdescribe('AdminUserService', () => {
  let service: AdminUserService ;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AdminUserService]
    });
    service = TestBed.get(AdminUserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkUsername method', () => {
    it('should get the response true, use GET method', () => {
      service.checkUsername('someUserName').subscribe((data: any) => {
        expect(data.response).toEqual(true);
      });
      const req = httpMock.expectOne(`AdminUser/checkUserName/someUserName`, 'call to api');
      expect(req.request.method).toBe('GET');

      req.flush({
        response: true
      });
      httpMock.verify();

    });
  });
  describe('checkUserEmail method', () => {

      it('should get the response true,  use GET method', () => {
        service.checkUserEmail('someUserName@gmail.com').subscribe((data: any) => {
          expect(data.response).toEqual(true);
        });
        const req = httpMock.expectOne(`AdminUser/checkEmailAddress/someUserName@gmail.com`, 'call to api');
        expect(req.request.method).toBe('GET');
        req.flush({
          response: true
        });
        httpMock.verify();
      });
  });
});
