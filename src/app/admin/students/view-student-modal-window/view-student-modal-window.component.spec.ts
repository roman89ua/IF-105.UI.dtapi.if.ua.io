import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentModalWindowComponent } from './view-student-modal-window.component';

describe('ViewStudentModalWindowComponent', () => {
  let component: ViewStudentModalWindowComponent;
  let fixture: ComponentFixture<ViewStudentModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
