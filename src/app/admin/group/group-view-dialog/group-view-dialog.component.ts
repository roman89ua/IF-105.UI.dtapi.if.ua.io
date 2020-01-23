import { Component, OnInit, Inject } from '@angular/core';
import { Speciality, Faculty } from '../../../shared/entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService} from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';  

interface DialogData {
  description: {
    title : string,
    action : string
  } 
}
@Component({
  selector: 'app-group-view-dialog',
  templateUrl: './group-view-dialog.component.html',
  styleUrls: ['./group-view-dialog.component.scss']
})
export class GroupViewDialogComponent implements OnInit {
  specialities: Speciality[] = [];
  faculties: Faculty[] = [];
  selectViewForm: FormGroup;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<GroupViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService,
    private fb: FormBuilder
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
        this.apiService
      .getEntity('speciality')
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
      case 'getGroupsByFaculty':
        this.apiService.getEntity('faculty').subscribe((result: Faculty[]) => {
          this.faculties = result;
        }, () => {
          this.modalService.openErrorModal('Помилка завантаження даних');
        });
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
