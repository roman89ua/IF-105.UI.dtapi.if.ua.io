import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Injectable()
export class ModalService {
  openConfirmModal(message:string, callBackFunction: Function): void { 
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callBackFunction();
      }
    });
  }
  openInfoModal(message: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '350px',
      data: {message: message}
    });
  }

  constructor( public dialog: MatDialog) { }
}
