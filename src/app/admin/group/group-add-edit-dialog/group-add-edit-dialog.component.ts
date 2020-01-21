<<<<<<< HEAD
import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../shared/http.service';
import { Speciality, Faculty } from '../../../shared/entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  data: any;
  description: any;
  title: any;
  action: any;
=======
import { Component, OnInit, Inject } from "@angular/core";
import { HttpService } from "../../../shared/http.service";
import { Speciality, Faculty } from "../../../shared/entity.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalService} from '../../../shared/services/modal.service';

export interface DialogData {
  data: any;
  description: {
    title : string,
    action : string
  }
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
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
    private httpService: HttpService,
    public dialogRef: MatDialogRef<GroupAddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.httpService
      .getRecords('speciality')
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
<<<<<<< HEAD
    this.httpService.getRecords('faculty').subscribe((result: Faculty[]) => {
      this.faculties = result;
      console.log(this.faculties);
=======
    this.httpService.getRecords("faculty")
      .subscribe((result: Faculty[]) => {
        this.faculties = result;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
    });
  }
}
