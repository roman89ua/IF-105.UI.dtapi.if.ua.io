import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule, HttpLoaderFactory } from '../../shared/shared.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DebugElement } from '@angular/core';

import { SubjectsComponent } from './subjects.component';
import { Subject } from 'src/app/admin/entity.interface';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, of, observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


fdescribe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let rootElement: DebugElement;
  // let apiService: ApiService;

  // const apiServiceStub = {

  // };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
    // providers: [{provide: ApiService, useValue: apiServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
    // apiService = TestBed.get(ApiService);
  });
  describe('simple test for SubjectComponent', () => {

    it('should create subjects component', () => {
      expect(component).toBeTruthy();
    });

    it('should have some table after construction', () => {
      expect(component.displayedColumns).not.toBeUndefined();
    });

    it('should set instance correctly', () => {
      expect(component).not.toBeNull();
      });

    it('should be a subject if there is data', () => {
    const newSubject: Subject = {
      subject_id: 1,
      subject_name: 'Sub name',
      subject_description: 'Sub description'
    };
    const newData: Array<Subject> = [newSubject];
    component.dataSource.data = newData;

    expect(component.dataSource.data.length).toBe(1);
  });

    it('will have the both ViewChild`s defined', () => {
      expect(fixture.componentInstance.paginator).toBeDefined();
      expect(fixture.componentInstance.sort).toBeDefined();
    });
  });

  // describe('showSubject function testing', () => {
  //   const someValue = {
  //     subject_id: '1',
  //     subject_name: 'some name',
  //     subject_description: 'some description'
  //   };
  //   it('should call getEntity method and get array of objects', () => {
  //     spyOn(apiService, 'getEntity').and.returnValue(of(someValue));
  //     const subj = component.showSubjects();
  //     expect(Array).toBeTruthy();
  //     expect(apiService.getEntity).toHaveBeenCalled();
  //   });
  // });


  afterEach(() => {
    fixture = null;
    component = null;
  });
});
