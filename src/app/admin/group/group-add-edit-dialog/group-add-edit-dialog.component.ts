import { Component, OnInit, Inject } from "@angular/core";
import { HttpService } from "../../../shared/http.service";
import { Speciality, Faculty } from "../../../shared/entity.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalService} from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

export interface DialogData {
  group: any;
  description: {
    title : string,
    action : string
  }
}
@Component({
  selector: "app-group-add-edit-dialog",
  templateUrl: "./group-add-edit-dialog.component.html",
  styleUrls: ["./group-add-edit-dialog.component.scss"]
})
export class GroupAddEditDialogComponent implements OnInit {
  specialities: Speciality[] = [];
  faculties: Faculty[] = [];
  addEditForm: FormGroup;

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<GroupAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    dialogRef.disableClose = true;
    if (data.group != null) {
      this.addEditForm = fb.group({
        'group_name': [data.group.group_name, Validators.required],
        'speciality_id': [data.group.speciality_id, Validators.required],
        'faculty_id': [data.group.faculty_id, Validators.required]
      });
    }
    else {
      this.addEditForm = fb.group({
        'group_name': [null, Validators.required],
        'speciality_id': [null, Validators.required],
        'faculty_id': [null, Validators.required]
      });
    }
  }

  ngOnInit() {
    this.httpService
      .getRecords("speciality")
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    this.httpService.getRecords("faculty")
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
