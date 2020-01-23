import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getLogo() {
    return this.http.get<any>('welcome/logo')
    .pipe(
      map(({ logo }) => logo),
      map((base64) => {
        return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
      })
    );
  }
}
