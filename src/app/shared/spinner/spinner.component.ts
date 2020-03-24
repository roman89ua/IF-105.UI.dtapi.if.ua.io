import { Component, OnInit, Input } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.loading$ = this.spinnerService.isLoading$
    .pipe(
     delay(0)
    );
  }

}
