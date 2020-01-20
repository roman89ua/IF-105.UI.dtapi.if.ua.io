import { Component, OnInit, Inject } from "@angular/core";
import { HttpService } from "../../../shared/http.service";
import { Speciality, Faculty } from "../../../shared/entity.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  data: any;
  description: any,
  title : any,
  action : any
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.httpService
      .getRecords("speciality")
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      });
    this.httpService.getRecords("faculty").subscribe((result: Faculty[]) => {
      this.faculties = result;
    });
  }
}
