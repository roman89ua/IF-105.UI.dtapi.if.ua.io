import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading$: Subject<boolean> = this.spinnerService.isLoading$;
  constructor(private spinnerService: SpinnerService) { }

ngOnInit() {}

}
