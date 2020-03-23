import { async, fakeAsync, ComponentFixture, TestBed, tick, getTestBed } from '@angular/core/testing';
import { SharedModule,} from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SubjectsComponent } from './subjects.component';
import { Subject } from 'src/app/admin/entity.interface';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { TranslateTestingModule } from 'ngx-translate-testing';



fdescribe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let rootElement: DebugElement;
  let debugElement: DebugElement;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({
          uk: require('src/assets/i18n/uk.json'),
          en: require('src/assets/i18n/en.json')
        }),
        // TranslateModule.forRoot({
        //   loader: {
        //     provide: TranslateLoader,
        //     useClass: FakeLoader,
        //     deps: [HttpClient]
        //   }
        // })
      ]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement;
    apiService = TestBed.get(ApiService);
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

  it('should display a button ', () => {
    const button = debugElement.query(By.css('.mat-elevation-z9 button'));
    expect(button).toBeTruthy();
  });
  // it('should have title h2 translated', () => {
  //   let injector = getTestBed();
  //   let translate = injector.get(LangBtnService);
  //   translate.switchLanguage('en');
  //   const title = fixture.debugElement.query(By.css('.toolbar h2'));
  //   expect(title.nativeElement.innerText).toMatch(translations['subjects.headerMain']);
  // });

  afterEach(() => {
    fixture = null;
    component = null;
    rootElement = null;
  });
});
