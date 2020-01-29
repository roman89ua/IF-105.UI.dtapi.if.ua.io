import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { environment } from '../environments/environment';


@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  private environmentUrl = environment.apiUrl;
  constructor(private snackBar: MatSnackBar) {  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 6000,

    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({ url: `${this.environmentUrl + request.url}` });
    return next.handle(apiReq)
      .pipe(
        tap((event: any):void => {
          if (event instanceof HttpResponse) {
            if(event.url.includes('insertData') === true && event.status == 200){
              this.openSnackBar('Створено','X')
            }else if(event.url.includes('update') === true && event.status == 200){
              this.openSnackBar('Відредаговано','X')
            }else if(event.url.includes('del') === true && event.status == 200){
              this.openSnackBar('Видалено','X')
            }
          }
        }
        ),
        retry(1),
        catchError((error: HttpErrorResponse) => {
                switch(error.status){
                  case 0:
                  this.openSnackBar(`Відсутнє з'єднання з інтернету. Код помилки: ${error.status}.`, 'X');
                    break;
                  case 400:
                  this.openSnackBar(` Не коректний запи. Код помилки: ${error.status}. ${error.statusText}`, 'X');
                    break;
                  case 401:
                  this.openSnackBar(`Несанкціонований доступ. Код помилки: ${error.status}. ${error.statusText}`, 'X');
                    break;
                  case 403:
                  this.openSnackBar(`Сервер відмовляється відповідати. Код помилки: ${error.status}. ${error.statusText}`, 'X');
                    break;
                  case 404:
                  this.openSnackBar(`Ресурс не знайдено. Код помилки: ${error.status}. ${error.statusText}`, 'X');
                    break;
                  case 500:
                  this.openSnackBar(`Внутрішня помилка серверу. Код помилки: ${error.status}. ${error.statusText}`, 'X');
                    break;
                  default:
                  this.openSnackBar(`О_о Ой, щось пішло не так. о_О Код помилки: ${error.status}. Повідомлення: ${error.statusText}`, 'X');
                    break;
                } 
            return throwError(error);
        })
    );
  }
}
