import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from '../group-modal.interface';

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
  ) { 
    dialogRef.disableClose = true;
    this.createForm();
  }
   private createForm() {
    this.selectViewForm = this.fb.group({
      'id': [null, Validators.required]
    });
   }

  ngOnInit() {}

  onSubmit() {
    const result = this.selectViewForm.value;
    result.action = this.data.description.action;
    this.dialogRef.close(result);
  }
  onDismiss() {
    this.dialogRef.close();
  }
}
