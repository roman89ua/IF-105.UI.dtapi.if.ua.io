import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { Faculty } from 'src/app/shared/entity.interface';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit, AfterViewInit {
  result: any;
  faculties: Faculty[] = [];
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  loading = false;

  dataSource = new MatTableDataSource<Faculty>();

  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalService: ModalService) { }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  ngOnInit(): void {
    this.getFaculty();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getFaculty() {
    this.loading = true;
    this.apiService.getEntity('Faculty')
      .subscribe(response => {
        this.dataSource.data = response;
        this.loading = false;
      },
        err => {
          this.modalService.openErrorModal('Можливі проблеми із сервером');
        });
  }
  addFaculty(faculty: Faculty) {
    this.apiService.createEntity('Faculty', faculty)
      .subscribe(response => {
        this.dataSource.data = [...this.dataSource.data, response[0]];
        this.table.renderRows();
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
        this.getFaculty();
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
      },
        err => {
          if (err.error.response.includes('Cannot delete')) {
            this.modalService.openInfoModal('Неможливо видалити факультет. Потрібно видалити групу цього факультету');
          } else {
            this.modalService.openErrorModal('Помилка видалення');
          }
        });
  }
}
