import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserComponent } from './create-update-user.component';

describe('CreateAdminUserComponent', () => {
  let component: CreateUpdateUserComponent;
  let fixture: ComponentFixture<CreateUpdateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
