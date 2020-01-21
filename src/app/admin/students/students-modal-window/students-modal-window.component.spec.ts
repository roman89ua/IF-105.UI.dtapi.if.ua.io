import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsModalWindowComponent } from './students-modal-window.component';

describe('StudentsModalWindowComponent', () => {
  let component: StudentsModalWindowComponent;
  let fixture: ComponentFixture<StudentsModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
