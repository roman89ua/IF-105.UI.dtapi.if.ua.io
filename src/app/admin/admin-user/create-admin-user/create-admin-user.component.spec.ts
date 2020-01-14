import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminUserComponent } from './create-admin-user.component';

describe('CreateAdminUserComponent', () => {
  let component: CreateAdminUserComponent;
  let fixture: ComponentFixture<CreateAdminUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdminUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
