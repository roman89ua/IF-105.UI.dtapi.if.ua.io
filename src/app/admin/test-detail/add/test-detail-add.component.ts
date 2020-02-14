import { Component, OnInit, Inject } from '@angular/core';
import { Test } from '../../entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import {range} from 'rxjs';

export interface DialogData {
  data: any;
  description: any;
}

@Component({
  selector: 'app-test-detail-add',
  templateUrl: './test-detail-add.component.html',
  styleUrls: ['./test-detail-add.component.scss']
})

export class TestDetailAddComponent implements OnInit {
  tests: Test[] = [];
  levels: number[];

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<TestDetailAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.levels = Array.from({length: 20}, (v, k) => k + 1);
    this.apiService
      .getEntity('test')
      .subscribe((result: Test[]) => {
        this.tests = result;
      });
  }
}
