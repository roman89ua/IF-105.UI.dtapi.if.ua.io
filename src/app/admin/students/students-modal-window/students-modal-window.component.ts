import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { StudentsService } from '../services/students.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-students-modal-window',
  templateUrl: './students-modal-window.component.html',
  styleUrls: ['./students-modal-window.component.scss']
})
export class StudentsModalWindowComponent implements OnInit {

  public studentForm = new FormGroup({
    lastname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    fathername: new FormControl('', Validators.required),
    gradebookID: new FormControl('', 
    Validators.required,
    this.uniqueValidator('gradebookID', 'checkGradebookId')),
    login: new FormControl('', 
    Validators.required,
    this.uniqueValidator('login', 'checkUsername')),
    email: new FormControl('', [
      Validators.required, 
      Validators.email,
    ], 
    this.uniqueValidator('email', 'checkUserEmail')),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirm: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentsHttpService: StudentsService,
    public dialogRef: MatDialogRef<StudentsModalWindowComponent>,
  ) { }

  ngOnInit() {
    this.studentForm.setValidators(this.comparisonValidator());
  }

  handleSubmit(value: any) {
    const studentDATA = {
        gradebook_id: value.gradebookID,
        student_surname: value.lastname,
        student_name: value.firstname,
        student_fname: value.fathername,
        group_id: this.data.group_id,
        password: value.password,
        username: value.login,
        email: value.email,
        photo: '',
        password_confirm: value.password_confirm,
        plain_password: value.password
    };
    this.studentsHttpService.createStudent(studentDATA).subscribe(
        (data) => this.dialogRef.close(data),
        error => this.dialogRef.close(error)
    );
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

  uniqueValidator(prop, method) {
    return (control: FormControl) => {
      if (this.data && this.data[prop] === control.value) {
        return of(null);
      }
      return this.studentsHttpService[method](control.value)
        .pipe(
          map((result: any) => {
            return result.response ? { propertyIsNotUnique: true } : null;
          })
        );
    };
  }
}
