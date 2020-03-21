import { TestBed, inject } from '@angular/core/testing';

import { AdminUserService } from './admin-user.service';
import { ICreateUpdateAdminUser, IAdminUser } from './admin-user.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('AdminUserService', () => {
  let service: AdminUserService ;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AdminUserService]
    });
    service = TestBed.get(AdminUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
