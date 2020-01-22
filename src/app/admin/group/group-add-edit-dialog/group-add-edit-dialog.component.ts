import { Component, OnInit, Inject } from "@angular/core";
import { Speciality, Faculty, Group } from "../../../shared/entity.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface DialogData {
  group: Group | null;
  description: {
    title: string;
    action: string;
  }
}
@Component({
  selector: 'app-group-add-edit-dialog',
  templateUrl: './group-add-edit-dialog.component.html',
  styleUrls: ['./group-add-edit-dialog.component.scss']
})
export class GroupAddEditDialogComponent implements OnInit {
  specialities: Speciality[] = [];
  faculties: Faculty[] = [];
  addEditForm: FormGroup;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<GroupAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService,
    private fb: FormBuilder
  ) { 
    dialogRef.disableClose = true;
    this.createForm();
  }

  private createForm() {
    if (this.data.group != null) {
      this.addEditForm = this.fb.group({
        'group_name': [this.data.group.group_name, Validators.required],
        'speciality_id': [this.data.group.speciality_id, Validators.required],
        'faculty_id': [this.data.group.faculty_id, Validators.required]
      });
    }
    else {
      this.addEditForm = this.fb.group({
        'group_name': [null, Validators.required],
        'speciality_id': [null, Validators.required],
        'faculty_id': [null, Validators.required]
      });
    }
  }


  ngOnInit() {
    this.apiService
      .getEntity('Speciality')
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    this.apiService.getEntity('Faculty')
      .subscribe((result: Faculty[]) => {
        this.faculties = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
  }

  onSubmit() {
    this.dialogRef.close(this.addEditForm.value);
  }
  onDismiss() {
    this.dialogRef.close();
  }
}
