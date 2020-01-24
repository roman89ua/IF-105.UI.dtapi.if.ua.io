import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpecialityService } from '../speciality.service';


export interface DialogData {
  description: any;
  data: any;
  speciality_code: number;
  speciality_name: string;
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  public controlArr = [];
  public specialityForm = new FormGroup({
    speciality_code: new FormControl(this.data ? this.data.speciality_code : '',
      [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(5), this.getUniqueValidator('speciality_code', 'getSpecialityCodeArray')]),
    speciality_name: new FormControl(this.data ? this.data.speciality_name : '',
      [Validators.required, this.getUniqueValidator('speciality_name', 'getSpecialityNameArray')]) 
  });
  constructor(private specialityService: SpecialityService, public dialogRef: MatDialogRef<DialogFormComponent>, @Inject(MAT_DIALOG_DATA) public data?: DialogData) { }

  ngOnInit() {
  }

  addSpeciality() {
    if (this.specialityForm.valid) {
      this.dialogRef.close(this.specialityForm.value);
    }
  }

  closeSpecialityFormDialog() {
    this.dialogRef.close();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.specialityForm.controls[controlName].hasError(errorName);
  }

  getUniqueValidator(prop, method) {
    return (control: FormControl) => {

      if (this.data && this.data[prop] === control.value || !this.specialityService[method]().includes(control.value)) {
      
        return null
      }
      else {
        return this.specialityService[method]().includes(control.value) ? { propertyIsNotUnique: true } : null;
      }
    }
  }
}
