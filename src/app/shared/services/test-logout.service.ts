import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestLogoutService {

  private massage = new Subject<boolean>();

  getMessage(): Observable<boolean> {
    return this.massage.asObservable();
  }

  updateMessage(message: boolean) {
    this.massage.next(message);
  }

  constructor() {
  }
}
