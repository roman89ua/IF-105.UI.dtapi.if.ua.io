import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  public specialityForm = new FormGroup({
    speciality_code: new FormControl(''),
    speciality_name: new FormControl('')
  });
  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<DialogFormComponent>) { }

  ngOnInit() {
  }
  addSpeciality() {
    this.dialogRef.close(this.specialityForm.value);
  }
  closeSpecialityFormDialog() {
    this.dialogRef.close();
  }
}
