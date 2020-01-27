import { Injectable } from '@angular/core';
import { GroupAddEditDialogComponent } from './group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';
import { MatDialog } from '@angular/material';
import { DialogData } from './../group/group-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupModalService {

  constructor(public dialog: MatDialog) { }

  // create modal window for add new group or edit group
  addGroupDialog(data: DialogData, callBackFunction: Function): void {
    const dialogRef = this.dialog.open(GroupAddEditDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callBackFunction(result);
      }
    });
  }

  editGroupDialog(data: DialogData, callBackFunction: Function): void {
    const dialogRef = this.dialog.open(GroupAddEditDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.group_id = data.group.group_id;
        callBackFunction(result);
      }
    });
  }

  viewGroupFeatureDialog(data: DialogData, callBackFunction: Function): void {
    const dialogRef = this.dialog.open(GroupViewDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        callBackFunction(result);
      }
    });
  }
}
