import {Component, OnInit, Inject} from '@angular/core';
import { Test } from '../../entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

export interface DialogData {
  data: any;
  description: any;
  usedLevels: number[];
}

@Component({
  selector: 'app-test-detail-add',
  templateUrl: './test-detail-add.component.html',
  styleUrls: ['./test-detail-add.component.scss']
})

export class TestDetailAddComponent implements OnInit {
  tests: Test[] = [];
  defaultLevels: number[];
  levels: number[];

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<TestDetailAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.defaultLevels = Array.from({length: 20}, (v, k) => k + 1);
    this.levels = this.getAvailableLevels();
    this.apiService
      .getEntity('test')
      .subscribe((result: Test[]) => {
        this.tests = result;
      });
  }

  private getAvailableLevels(): number[] {
    const usedLevelsExceptCurrent = this.data.usedLevels.filter(n => n !== Number(this.data.data.level));

    return this.defaultLevels.filter(num => !usedLevelsExceptCurrent.includes(num));
  }
}
