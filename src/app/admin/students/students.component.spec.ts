import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import {
  MatIconModule,
  MatFormFieldModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatDividerModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentsComponent
      ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatDividerModule
      ],
      providers: [
        ModalService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
