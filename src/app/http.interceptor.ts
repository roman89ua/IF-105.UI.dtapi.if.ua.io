import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpResponse
  } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { ModalService } from './shared/services/modal.service';
import { tap,  } from 'rxjs/operators';


@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(private message: ModalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({ url: `http://dtapi.if.ua/api/${request.url}` });
    return next.handle(apiReq)
    .pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.url.includes('insertData')) {
            this.message.openInfoModal('Супер');
          }
        })
    );
  }
}
