import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { errorMapping, defaultMessage } from '../app/http.interceptor.constants';
@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  private environmentUrl = environment.apiUrl;
  constructor(private snackBar: MatSnackBar, private router: Router) {  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 6000,

    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({ url: `${this.environmentUrl + request.url}` });
    return next.handle(apiReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const mappedError = errorMapping.find(({status}) => error.status === status);
          this.openSnackBar(mappedError && mappedError.message || defaultMessage,'X');
          if (error.status === 401 || error.status === 403){
            this.router.navigate(['login']);
          }
            return throwError(error);
        })
    );
  }
}
