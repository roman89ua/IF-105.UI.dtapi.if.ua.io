import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ModalService {
  openConfirmModal(message: string, callBackFunction: Function): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {content: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callBackFunction();
      }
    });
  }
  openAlertModal(message: string, title: string, icon: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '350px',
      data: {
        content: message,
        title: title,
        icon: icon
      }
    });
  }
  openInfoModal(message: string): void {
    this.openAlertModal(message, 'Повідомлення', 'info');
  }
  openErrorModal(message: string): void {
    this.openAlertModal(message, 'Помилка', 'error');
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
  constructor( public dialog: MatDialog, private snackBar: MatSnackBar) { }
}
