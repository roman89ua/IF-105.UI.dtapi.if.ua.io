import { Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from './group-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupModalService {

  constructor(public dialog: MatDialog) { }
  // create modal window for add new group or edit group or checked feature
  groupDialog(modalWindow, data: DialogData, callBackFunction: Function ): void {
    const dialogRef = this.dialog.open(modalWindow, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (data.group) {
          result.group_id = data.group.group_id;
        }
        callBackFunction(result);
      }
    });
  }
}
