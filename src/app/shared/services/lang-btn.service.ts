import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class LangBtnService {

  constructor(private translate: TranslateService) { }
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }
}
