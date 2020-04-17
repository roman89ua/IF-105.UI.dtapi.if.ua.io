import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { errorMapping, defaultMessage } from '../app/http.interceptor.constants';
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  private environmentUrl = environment.apiUrl;
  constructor(private snackBar: MatSnackBar, private router: Router, public translate: TranslateService) {  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 6000,

    });
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = null;
    request.url.includes('assets/i18n') ? apiReq = request : apiReq = request.clone({url: `${this.environmentUrl + request.url}`});
    return next.handle(apiReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const mappedError = errorMapping.find(({status}) => error.status === status);
          if ( mappedError && this.translate.instant(mappedError.message) ) {
            this.openSnackBar(this.translate.instant(mappedError.message) , 'X');
          }
          // this.openSnackBar(mappedError && this.translate.instant(mappedError.message) || this.translate.instant(defaultMessage), 'X');
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['login']);
          }
          return throwError(error);
        })
    );
  }
}
