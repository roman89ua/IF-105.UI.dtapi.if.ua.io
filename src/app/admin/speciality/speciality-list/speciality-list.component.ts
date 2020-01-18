import { Component, OnInit, ViewChild } from '@angular/core';
import { Speciality } from '.././../entity.interface';
import { ApiService } from '../../../shared/services/api.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog, MatTableDataSource, MatTable, MatPaginator, MatSnackBar } from '@angular/material';
import { ModalService } from '../../../shared/services/modal.service';
@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})

export class SpecialityListComponent implements OnInit {

  public result: any;
  public entity = 'Speciality';
  public speciality: Speciality[] = [];
  public displayedColumns: string[] = ['code', 'name', 'buttons'];
  public dataSource = new MatTableDataSource<Speciality>();

  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar, private modalService: ModalService) { }

  ngOnInit() {
    this.getSpeciality();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getSpeciality(): any {
    const action = 'getRecords';
    this.apiService.getEntity(this.entity, action).subscribe((data: Speciality[]) => this.dataSource.data = data);
  }

  openConfirmDialog(speciality: Speciality) {
    const message = `Підтвердіть видалення спеціальності "${speciality.speciality_name}"`;
    this.modalService.openConfirmModal(message, () => this.delSpeciality(speciality));
  }

  /*   delSpecialityDialog(speciality: Speciality): void {
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
    } */
  delSpeciality(obj: Speciality) {
    const action = 'del';
    this.apiService.delEntity(this.entity, action, obj.speciality_id)
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter(speciality => speciality.speciality_id !== obj.speciality_id);
      }, err => {
        this.openSnackBar(err.error.response);
      });
  }
  addSpeciality() {
    const action = 'insertData';
    const dialogRef = this.dialog.open(DialogFormComponent, {
      data: {},
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        return this.apiService.postEntity(this.entity, action, data).subscribe((obj: Speciality) => {
          this.speciality = [obj, ...this.speciality];
          this.getSpeciality();
        }, err => {
          this.openSnackBar(err.error.response);
        }
        );
      }
    });
  }
  updSpeciality(speciality: Speciality) {
    const action = 'update';
    const dialogRef = this.dialog.open(DialogFormComponent, {
      data: speciality,
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: Speciality) => {
      if (data) {
        data.speciality_id = speciality.speciality_id;
        return this.apiService.updEntity(this.entity, action, data, speciality.speciality_id).subscribe((specialityObj: Speciality) => {
          this.speciality = [specialityObj, ...this.speciality];
          this.getSpeciality();
        }, err => {
          this.openSnackBar(err.error.response);
        });
      }
      this.getSpeciality();
    });
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

}
