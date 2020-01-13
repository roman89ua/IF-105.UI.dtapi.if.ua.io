import { Component, Inject } from '@angular/core';
import { DialogData } from '../../entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-del-dialog',
  templateUrl: './group-del-dialog.component.html',
  styleUrls: ['./group-del-dialog.component.scss']
})
export class GroupDelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GroupDelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
