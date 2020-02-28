import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultGroupsRaitingComponent } from './result-groups-raiting.component';

describe('ResultGroupsRaitingComponent', () => {
  let component: ResultGroupsRaitingComponent;
  let fixture: ComponentFixture<ResultGroupsRaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultGroupsRaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultGroupsRaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
