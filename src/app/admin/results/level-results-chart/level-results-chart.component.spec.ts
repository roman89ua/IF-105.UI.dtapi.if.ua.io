import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelResultsChartComponent } from './level-results-chart.component';

describe('LevelResultsChartComponent', () => {
  let component: LevelResultsChartComponent;
  let fixture: ComponentFixture<LevelResultsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelResultsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelResultsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
