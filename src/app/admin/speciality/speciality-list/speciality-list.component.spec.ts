import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityListComponent } from './speciality-list.component';

describe('SpecialityListComponent', () => {
  let component: SpecialityListComponent;
  let fixture: ComponentFixture<SpecialityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
