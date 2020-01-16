import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Speciality } from '.././../entity.interface';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  public specialityForm = new FormGroup({
    speciality_code: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1)])),
    speciality_name: new FormControl('', [Validators.required])
  });
  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<DialogFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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
  public hasError = (controlName: string, errorName: string) => {
    return this.specialityForm.controls[controlName].hasError(errorName);
  }
}
