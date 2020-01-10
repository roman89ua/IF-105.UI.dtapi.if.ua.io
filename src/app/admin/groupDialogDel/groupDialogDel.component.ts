import { Component, OnInit, Inject } from "@angular/core";
import { DialogData } from "../entity.interface";
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
    selector: "app-groupDialogDel",
    templateUrl: "./groupDialogDel.component.html",
    styleUrls: ["./groupDialogDel.component.scss"]
  })
  export class GroupDialogDelComponent {
    constructor(
      public dialogRef: MatDialogRef<GroupDialogDelComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
  }