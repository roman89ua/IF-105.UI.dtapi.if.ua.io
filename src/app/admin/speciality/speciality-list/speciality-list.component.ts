import { Component, OnInit, ViewChild } from '@angular/core';
import { Speciality } from '.././../entity.interface';
import { ApiService } from '../../../shared/services/api.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ModalService } from '../../../shared/services/modal.service';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../../store/MainReducer';
import { allSpecialitiesLoaded } from '../../store/speciality/speciality-actions';
@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})

export class SpecialityListComponent implements OnInit {

  public displayedColumns: string[] = ['code', 'name', 'buttons'];
  public dataSource = new MatTableDataSource<Speciality>();

  @ViewChild('table') table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private store: Store<AdminState>) { }

  ngOnInit() {
    this.getSpeciality();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getSpeciality(): any {
    this.apiService.getEntity('Speciality').subscribe((data: Speciality[]) =>{
       this.dataSource.data = data;
      this.store.dispatch(allSpecialitiesLoaded({specialities: data}));
      });
  }

  openConfirmDialog(speciality: Speciality) {
    const message = `Підтвердіть видалення спеціальності "${speciality.speciality_name}"`;
    this.modalService.openConfirmModal(message, () => this.delSpeciality(speciality));
  }
  delSpeciality(obj: Speciality) {
    this.apiService.delEntity('Speciality', obj.speciality_id)
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter(speciality => speciality.speciality_id !== obj.speciality_id);
        this.openSnackBar('Спеціальність ' + obj.speciality_name + ' була успішно видалена');
      }, err => {
        this.openSnackBar(err.error.response);
      });
  }
  addSpeciality() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        return this.apiService.createEntity('Speciality', data).subscribe((obj: Speciality) => {
          this.openSnackBar('Спеціальність ' + data.speciality_name + ' була успішно створена');
          this.dataSource.data = [...this.dataSource.data, obj[0]];
          this.table.renderRows();
        }, err => {
          this.openSnackBar(err.error.response);
        }
        );
      }
    });
  }
  updSpeciality(speciality: Speciality) {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      data: speciality,
      width: '450px',
      disableClose: true,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((data: Speciality) => {
      if (data) {
        data.speciality_id = speciality.speciality_id;
        return this.apiService.updEntity('Speciality', data, speciality.speciality_id).subscribe((specialityObj: Speciality) => {
          this.openSnackBar('Спеціальність ' + speciality.speciality_name + ' була успішно відредагована');
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
