import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize, tap } from 'rxjs/operators';
import { apiEndpoints } from '../constants';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    requestCount = 0;
    constructor(private spinnerService: SpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestCount++;
        if (!this.checkURL(request)) {
            this.spinnerService.show();
        }
        return next.handle(request)
            .pipe(
                finalize(() => {
                    this.requestCount--;
                    if (this.requestCount === 0) {
                        this.spinnerService.hide();
                    }
                })
            );
    }
    checkURL(req: HttpRequest<any>): boolean {
        if (req.url.includes(apiEndpoints[0]) || req.url.includes(apiEndpoints[1]) || req.url.includes(apiEndpoints[2])) {
           return true;
        }
    }
}
