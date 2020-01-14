import { Component, OnInit, ViewChild } from '@angular/core';
import { Speciality } from '.././../entity.interface';
import { ApiService } from '../api.service';
import { DialogConfirmComponent, DialogConfirmModel } from '../dialog-confirm/dialog-confirm.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog, MatTableDataSource, MatTable, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})

export class SpecialityListComponent implements OnInit {

  result: any;
  public entity = 'Speciality';
  Speciality: Speciality[] = [];
  displayedColumns: string[] = ['code', 'name', 'buttons'];
  dataSource = new MatTableDataSource<Speciality>();

  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getSpeciality();
  }
  getSpeciality(): any {
    const action = 'getRecords';
    this.apiService.getEntity(this.entity, action).subscribe((data: Speciality[]) => this.dataSource.data = data);
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
  addSpeciality() {
    const action = "insertData "
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        return this.apiService.postEntity(this.entity, action, data).subscribe((data: Speciality) => {
          this.Speciality = [data, ...this.Speciality];
          this.getSpeciality();
        }
        );
      }
    })
  }
  updSpeciality(obj: Speciality) {
    const action = "update"
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '450px',
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((data: Speciality) => {
      if (data) {
        data.speciality_id = obj.speciality_id;
        return this.apiService.updEntity(this.entity, action, data, obj.speciality_id).subscribe((data: Speciality) => {
          this.Speciality = [data, ...this.Speciality];
          this.getSpeciality();
        }
        );
      }
    })
  }
}
