import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../shared/http.service';
import { Speciality, Faculty } from '../../../shared/entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService} from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

export interface DialogData {
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
    private httpService: HttpService,
    public dialogRef: MatDialogRef<GroupViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService,
    private fb: FormBuilder
  ) { 
    dialogRef.disableClose = true;
    this.selectViewForm = fb.group({
      'id': [null, Validators.required]
    });
  }

  ngOnInit() {
    switch (this.data.description.action) {
      case 'getGroupsBySpeciality':
        this.httpService
      .getRecords('speciality')
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
      case 'getGroupsByFaculty':
        this.httpService.getRecords('faculty').subscribe((result: Faculty[]) => {
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
