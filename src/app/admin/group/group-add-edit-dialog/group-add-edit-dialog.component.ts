import { Component, OnInit, Inject } from "@angular/core";
import { Speciality, Faculty } from "../../../shared/entity.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalService} from '../../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';

export interface DialogData {
  data: any;
  description: {
    title : string,
    action : string
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

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<GroupAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.apiService
      .getEntity('Speciality')
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    this.apiService.getEntity("Faculty")
      .subscribe((result: Faculty[]) => {
        this.faculties = result;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }
}
