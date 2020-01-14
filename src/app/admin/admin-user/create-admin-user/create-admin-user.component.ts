import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AdminUserService } from '../admin-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrls: ['./create-admin-user.component.scss']
})
export class CreateAdminUserComponent implements OnInit {
  public addForm = new FormGroup({
    username: new FormControl(this.data ? this.data.username : '', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password_confirm: new FormControl('', [Validators.required]),
    email: new FormControl(this.data ? this.data.email : '', [Validators.required, Validators.email]),
  });
  hide = true;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CreateAdminUserComponent>) { }

  ngOnInit() {
    this.addForm.setValidators(this.comparisonValidator())
  }
  addAdminHandler() {
     this.dialogRef.close({...this.addForm.value, id: this.data ? this.data.id : null});
  }

  cancelCreateAdminHandler() {
    this.dialogRef.close();
  }

  comparisonValidator() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
       const control1 = group.get('password');
       const control2 = group.get('password_confirm');
       if (control1.value !== control2.value) {
          control2.setErrors({notEquivalent: true});
       } else {
          control2.setErrors(null);
       }
       return;
 };
}
}
