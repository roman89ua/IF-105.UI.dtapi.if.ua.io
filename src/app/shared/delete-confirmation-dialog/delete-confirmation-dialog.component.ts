import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(
     public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

  onCancelHandler() {
    const responce = {
      isCanceled: true,
      id: null,
      name: null,
    };
    this.dialogRef.close(responce);
  }

  onOkHandler() {
    const responce = {
      isCanceled: false,
      ...this.data
    };
    this.dialogRef.close(responce);
  }

}
