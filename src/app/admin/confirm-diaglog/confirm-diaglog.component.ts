import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-diaglog',
  templateUrl: './confirm-diaglog.component.html',
  styleUrls: ['./confirm-diaglog.component.scss']
})
export class ConfirmDiaglogComponent implements OnInit {
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDiaglogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.message = data.message;
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
  constructor(public message: string) {
  }
}
