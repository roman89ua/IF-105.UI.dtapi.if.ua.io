import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { SharedModule, HttpLoaderFactory } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { SubjectsComponent } from './subjects.component';
import { Subject } from 'src/app/admin/entity.interface';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectsCreateModalComponent } from './subjects-create-modal/subjects-create-modal.component';


fdescribe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let rootElement: DebugElement;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsComponent],
      imports: [
        NoopAnimationsModule,
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

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;

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

    it('should be no subject if there is no data', () => {
      expect(component.dataSource.data.length).toBe(0);
    });

    it('will have the both ViewChild`s defined', () => {
      expect(fixture.componentInstance.paginator).toBeDefined();
      expect(fixture.componentInstance.sort).toBeDefined();
    });
  });

  describe ('subjects component main functionality testing', () => {

    const apiServiceStub = {
      subject: {
        subject_id: '2',
        subject_name: 'Вища математика',
        subject_description: 'Якийсь там опис'
      },

      editedSubjects: {
        subject_id: '2',
        subject_name: 'Вища математика',
        subject_description: 'Правильний опис предмета'
      },
      getEntity: async () => {
        return component.dataSource.data = [this.subject];
      },
      delEntity: async () => {
        return component.dataSource.data = [];
      },
      createEntity: async () => {
        component.dataSource.data = [this.subject];
        return this.subject;
      },

      updEntity: async () => {
        component.dataSource.data = [this.editedSubjects];
        return this.editedSubjects;
      }

    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{provide: ApiService, useValue: apiServiceStub}],
      }).compileComponents();
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SubjectsCreateModalComponent]
      }
    });
    // it ('should get subject', fakeAsync(() => {

    //   component.showSubjects();
    // }));
  });
  afterEach(() => {
    fixture = null;
    component = null;

  });
});
