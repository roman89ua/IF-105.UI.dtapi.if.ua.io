import { Component, OnInit, Inject } from "@angular/core";
import { HttpService } from "../../../shared/http.service";
import { Speciality, Faculty } from "../../../shared/entity.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalService} from '../../../shared/services/modal.service';

export interface DialogData {
  data: any;
  description: string,
  title : string,
  action : string
}
@Component({
  selector: "app-group-add-edit-dialog",
  templateUrl: "./group-add-edit-dialog.component.html",
  styleUrls: ["./group-add-edit-dialog.component.scss"]
})
export class GroupAddEditDialogComponent implements OnInit {
  specialities: Speciality[] = [];
  faculties: Faculty[] = [];

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<GroupAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService
  ) {}

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
}
