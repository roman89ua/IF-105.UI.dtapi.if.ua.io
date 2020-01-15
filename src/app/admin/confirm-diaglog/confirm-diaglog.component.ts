import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Faculty } from '../faculties/faculties.service';
import { IQuestion } from '../test/question/question';

@Component({
  selector: 'app-confirm-diaglog',
  templateUrl: './confirm-diaglog.component.html',
  styleUrls: ['./confirm-diaglog.component.scss']
})
export class ConfirmDiaglogComponent implements OnInit {
  title: string;
  obj: Faculty | string;

  constructor(public dialogRef: MatDialogRef<ConfirmDiaglogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = data.title;
    this.obj = data.obj;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
  
  ngOnInit() {
  }

}

export class ConfirmDialogModel {
  constructor(public title: string, public obj: Faculty | string) {
  }
}
