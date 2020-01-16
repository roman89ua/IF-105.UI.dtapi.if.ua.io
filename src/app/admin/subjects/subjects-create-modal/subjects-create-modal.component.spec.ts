import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsCreateModalComponent } from './subjects-create-modal.component';

describe('SubjectsCreateModalComponent', () => {
  let component: SubjectsCreateModalComponent;
  let fixture: ComponentFixture<SubjectsCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsCreateModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
