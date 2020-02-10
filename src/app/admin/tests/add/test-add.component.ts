import { Component, OnInit, Inject } from '@angular/core';
import { Faculty } from '../../../shared/entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from '../../entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';

export interface DialogData {
  data: any;
  description: any;
}
@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss']
})
export class TestAddComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<TestAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.apiService
      .getEntity('Subject')
      .subscribe((result: Subject[]) => {
        this.subjects = result;
      });
  }
}
