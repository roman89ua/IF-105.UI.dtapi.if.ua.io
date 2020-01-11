import { Component, OnInit, Inject } from "@angular/core";
import { HttpService } from "../../shared/http.service";
import { Speciality, Faculty, DialogData } from "../entity.interface";
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
    selector: "app-group-view-dialog",
    templateUrl: "./group-view-dialog.component.html",
    styleUrls: ["./group-view-dialog.component.scss"]
  })
  export class GroupViewDialogComponent implements OnInit {
    specialities: Speciality[] = [];
    faculties: Faculty[] = [];
  
    constructor(
      private httpService: HttpService,
      public dialogRef: MatDialogRef<GroupViewDialogComponent>,
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