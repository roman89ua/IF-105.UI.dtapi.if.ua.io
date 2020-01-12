import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openConfirmDialog(data): Observable<number> {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '450px',
      data,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
}
