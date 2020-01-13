import { Component, OnInit } from '@angular/core';
import { Speciality } from '.././../entity.interface';
import { ApiService } from '../api.service';
import { DialogConfirmComponent, DialogConfirmModel } from '../dialog-confirm/dialog-confirm.component';

import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})


export class SpecialityListComponent implements OnInit {

  result: any;
  public entity = 'Speciality';
  faculties: Speciality[] = [];
  displayedColumns: string[] = ['code', 'name', 'buttons'];
  dataSource = new MatTableDataSource<Speciality>();

  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  SpecialityForm = new FormGroup({
    speciality_code: new FormControl(),
    speciality_name: new FormControl(),
  });
  UpdateForm = new FormGroup({
    speciality_code: new FormControl(),
    speciality_name: new FormControl(),
  });

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getSpeciality();
  }
  getSpeciality(): any {
    const action = 'getRecords';
    this.apiService.getEntity(this.entity, action).subscribe((data: Speciality[]) => this.dataSource.data = data);
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  delSpecialityDialog(speciality: Speciality): void {
    const dialogData = new DialogConfirmModel(speciality);
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.delSpeciality(this.result);
      }
    });
  }

  delSpeciality(obj: Speciality) {
    const action = 'del';
    this.apiService.delEntity(this.entity, action, obj.speciality_id)
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter(speciality => speciality.speciality_id !== obj.speciality_id);
      });
  }
  // this.dataSource.data = response;

}
