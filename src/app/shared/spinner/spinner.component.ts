import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading$;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.loading$ = this.spinnerService.isLoading$
    .pipe(
     delay(0)
    );
  }

}
