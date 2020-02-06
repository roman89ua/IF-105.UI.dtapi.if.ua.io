import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResultComponent } from './detail-result.component';

describe('DetailResultComponent', () => {
  let component: DetailResultComponent;
  let fixture: ComponentFixture<DetailResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
