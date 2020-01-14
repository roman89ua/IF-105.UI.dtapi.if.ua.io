import { Component, OnInit, Inject } from '@angular/core';
import { Speciality } from '.././../entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  obj: Speciality;
  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogConfirmModel) {
    this.obj = data.obj;
  }
  onConfirm(): void {
    this.dialogRef.close(this.obj);
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  ngOnInit() {
  }
}
export class DialogConfirmModel {
  constructor(public obj: Speciality) {
  }
}
