import { Component, OnInit, AfterViewInit, OnDestroy, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar, MatPaginator } from '@angular/material';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { Faculty } from 'src/app/shared/entity.interface';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { PaginatorService } from 'src/app/shared/paginator/paginator.service';
import { PaginationModel } from 'src/app/shared/paginator/PaganationModel';


@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit, AfterViewInit {

  /* TABLE  */
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  dataSource = new MatTableDataSource<Faculty>();
  @ViewChild('table', { static: false }) table: MatTable<Element>;


  /* for Paginator component */
  length: number;
  paginator: PaginationModel;
  matpaginator: MatPaginator;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private paginatorService: PaginatorService) { }


/*            For Paganator component        */
  public onPaginationChanged(paginatorModel: PaginationModel): void {
    this.paginator = paginatorModel;
    this.getRange(paginatorModel);
    this.getCountRecords();
  }

  getMatPagination(matpaginator: MatPaginator) {
    this.matpaginator = matpaginator;
  }
  getRange(paginator: PaginationModel) {
    this.paginatorService.getRange('Faculty', paginator)
      .subscribe(data => this.dataSource.data = data,
        () => this.modalService.openErrorModal('Можливі проблеми із сервером'));
  }

  getCountRecords() {
    this.apiService.getCountRecords('Faculty')
      .subscribe(data => this.length = data.numberOfRecords);
  }

/*        *****************************************       */

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  addFaculty(faculty: Faculty) {
    this.apiService.createEntity('Faculty', faculty)
      .subscribe(response => {
        this.getRange(this.paginator);
        this.getCountRecords();
        this.openSnackBar('Факультет додано');
      },
        err => {
          if (err.error.response.includes('Duplicate')) {
            this.modalService.openErrorModal(`Факультети "${faculty.faculty_name}" вже існує`);
          }
        }
      );
  }
  updateFaculty(id: number, faculty: Faculty) {
    this.apiService.updEntity('Faculty', faculty, id)
      .subscribe(response => {
        this.openSnackBar('Факультет оновлено');
        this.getRange(this.paginator);
      },
        err => {
          if (err.error.response.includes('Error when update')) {
            this.openSnackBar('Інформація про факультет не змінювалась');
          }
        }
      );
  }


  createFacultyDialog() {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((dialogResult: Faculty) => {
      if (dialogResult) {
        this.addFaculty(dialogResult);
      } else { return; }
    });
  }


  updateFacultyDialog(faculty: Faculty) {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '400px',
      data: faculty
    });
    dialogRef.afterClosed().subscribe((dialogResult: Faculty) => {
      if (dialogResult) {
        this.updateFaculty(faculty.faculty_id, dialogResult);
      } else { return; }
    });
  }


  openConfirmDialog(faculty: Faculty) {
    const message = `Підтвердіть видалення факультету "${faculty.faculty_name}"?`;
    this.modalService.openConfirmModal(message, () => this.removeFaculty(faculty.faculty_id));
  }


  removeFaculty(id: number) {
    this.apiService.delEntity('Faculty', id)
      .subscribe((response) => {
        this.openSnackBar('Факультет видалено');
        this.dataSource.data = this.dataSource.data.filter(item => item.faculty_id !== id);
        if (this.dataSource.data.length > 0) {
          this.getRange(this.paginator);
          this.getCountRecords();
        } else {
          this.paginator.pageIndex--;
          this.matpaginator.previousPage();
          this.getRange(this.paginator);
          this.getCountRecords();
        }
      },
        err => {
          if (err.error.response.includes('Cannot delete')) {
            this.modalService.openInfoModal('Неможливо видалити факультет. Потрібно видалити групу цього факультету');
          } else {
            this.modalService.openErrorModal('Помилка видалення');
          }
        });
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
