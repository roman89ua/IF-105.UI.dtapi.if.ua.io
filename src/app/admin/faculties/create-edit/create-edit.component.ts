import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Faculty } from 'src/app/shared/entity.interface';


@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<CreateEditComponent>, @Inject(MAT_DIALOG_DATA) public data: Faculty) { }
  @ViewChild('addform') addform;

  addForm = new FormGroup({
    faculty_name: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[а-яА-ЯіІїЄє ]*')
      ]),
    faculty_description: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[а-яА-ЯіІїЄє,. ]*')
      ])
  });
  onSubmit(): void {
    this.dialogRef.close(this.addForm.value);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  get faculty_name() {
    return this.addForm.get('faculty_name') as FormControl;
  }

  get faculty_description() {
    return this.addForm.get('faculty_description') as FormControl;
  }

  getErrorMessage(field: FormControl) {
    return field.hasError('required') ? 'Це поле є обовязкове*' :
      field.hasError('pattern') ? 'Поле містить недопустимі символи або (Цифри, латинські букви)' :
        '';
  }


  ngOnInit() {
    if (this.data) {
      this.addForm.patchValue({
        faculty_name: this.data.faculty_name,
        faculty_description: this.data.faculty_description,
      });
    }
  }
}
