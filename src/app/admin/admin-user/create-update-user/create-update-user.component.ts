import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AdminUserService } from '../admin-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {
  public userForm = new FormGroup({
    username: new FormControl(
      this.data ? this.data.username : '',
      [Validators.required],
      this.getUniqueValidator('username', 'checkUsername')),
    password: new FormControl('', this.data ? undefined : [Validators.required]),
    password_confirm: new FormControl('', this.data ? undefined : [Validators.required]),
    email: new FormControl(
      this.data ? this.data.email : '',
      [Validators.required, Validators.email],
      this.getUniqueValidator('email', 'checkUserEmail')),
  });
  hide = true;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<CreateUpdateUserComponent>,
      private adminUserService: AdminUserService,
    ) { }

  ngOnInit() {
    this.userForm.setValidators(this.comparisonValidator());
  }
  addAdminHandler() {
     this.dialogRef.close({...this.userForm.value, id: this.data ? this.data.id : null});
  }

  cancelCreateAdminHandler() {
    this.dialogRef.close();
  }

  comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.get('password');
      const control2 = group.get('password_confirm');
      if (control1.value !== control2.value) {
        control2.setErrors({ notEquivalent: true });
      } else {
        control2.setErrors(null);
      }
      return;
    };
  }

  getUniqueValidator(prop, method) {
    return (control: FormControl) => {
      if (this.data && this.data[prop] === control.value) {
        return of(null);
      }
      return this.adminUserService[method](control.value)
        .pipe(
          map((result: any) => {
            return result.response ? { propertyIsNotUnique: true } : null;
          })
        );
    };
  }
}
