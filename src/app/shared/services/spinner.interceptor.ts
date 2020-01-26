import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    requestCount = 0;
    constructor(private spinnerService: SpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestCount++;
        this.spinnerService.show();
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
}
