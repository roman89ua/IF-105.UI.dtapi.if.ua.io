import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { HttpService } from "../../../shared/http.service";
import { Speciality, Faculty, DialogData } from "../entity.interface";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
    selector: "app-groupDialogAdd",
    templateUrl: "./groupDialogAdd.component.html",
    styleUrls: ["../group.component.scss"]
  })
  export class GroupDialogAddComponent implements OnInit {
    specialities: Speciality[] = [];
    faculties: Faculty[] = [];
  
    constructor(
      private httpService: HttpService,
      public dialogRef: MatDialogRef<GroupDialogAddComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
  
    ngOnInit() {
      this.httpService
        .getRecords("speciality")
        .subscribe((result: Speciality[]) => {
          this.specialities = result;
          console.log(this.specialities);
        });
      this.httpService.getRecords("faculty").subscribe((result: Faculty[]) => {
        this.faculties = result;
        console.log(this.faculties);
      });
    }
  }
  