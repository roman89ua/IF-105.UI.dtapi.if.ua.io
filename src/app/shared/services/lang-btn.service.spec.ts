import { TestBed, inject } from '@angular/core/testing';

import { LangBtnService } from './lang-btn.service';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Observable, of } from 'rxjs';
import { TranslateLoader, TranslateService, TranslateModule } from '@ngx-translate/core';



fdescribe('LangBtnService', () => {
  let service: LangBtnService;
  let store = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en.json'),
          uk: require('src/assets/i18n/uk.json')
        })
      ],
      providers: [
        LangBtnService
      ]
    });
    service = TestBed.get(LangBtnService);
    const mockLocalStorage = {
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  });

  it('should create LangBtnService', () => {
    expect(service).toBeTruthy();
  });

  it('should store a language value in localStorage', () => {
      const language = 'en';
      service.switchLanguage(language);
      expect(store).toEqual({ lang: 'en' });
  });

});

let translations: any = {'TEST': 'This is a test'};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}
fdescribe('TranslateService', () => {
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ]
    });
    translate = TestBed.get(TranslateService);
  });
  afterEach(() => {
    translate = undefined;
    translations = {'TEST': 'This is a test'};
  });
  it('is defined', () => {
    expect(TranslateService).toBeDefined();
    expect(translate).toBeDefined();
    expect(translate instanceof TranslateService).toBeTruthy();
  });

  it(`should return the key when it doesn't find a translation`, () => {
    translate.use('en');
    translate.get('TEST2').subscribe((res: string) => {
      expect(res).toEqual('TEST2');
    });
  });

  it(`should return the key when you haven't defined any translation`, () => {
    translate.get('TEST').subscribe((res: string) => {
      expect(res).toEqual('TEST');
    });
  });
});
