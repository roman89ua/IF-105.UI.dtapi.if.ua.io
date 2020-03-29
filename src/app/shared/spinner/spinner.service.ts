import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    isLoading$ = new BehaviorSubject<boolean>(false);

    show() {
        this.isLoading$.next(true);
    }
    hide() {
        setTimeout(() => this.isLoading$.next(false), 500);
    }
}
