import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from '../group-modal.interface';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-view-dialog',
  templateUrl: './group-view-dialog.component.html',
  styleUrls: ['./group-view-dialog.component.scss']
})
export class GroupViewDialogComponent implements OnInit {
  selectViewForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GroupViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private groupService: GroupService
  ) { 
    dialogRef.disableClose = true;
    this.createForm();
  }
   private createForm() {
    this.selectViewForm = this.fb.group({
      'id': [null, Validators.required]
    });
   }

  ngOnInit() {
    switch (this.data.description.action) {
      case 'getGroupsBySpeciality':
        this.groupService.getListSpeciality();
        break;
      case 'getGroupsByFaculty':
        this.groupService.getListFaculty();
        break;
    }
  }

  onSubmit() {
    const result = this.selectViewForm.value;
    result.action = this.data.description.action;
    this.dialogRef.close(result);
  }
  onDismiss() {
    this.dialogRef.close();
  }
}
