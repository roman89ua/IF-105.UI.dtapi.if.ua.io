import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { Faculty } from 'src/app/shared/entity.interface';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { FacultiesService } from './faculties.service';
import { Observable } from 'rxjs';
import { PaginatorService } from 'src/app/shared/paginator/paginator.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit, AfterViewInit {
  length;
  result: any;

  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];

  dataSource = new MatTableDataSource<Faculty>();

  @ViewChild('table', { static: false }) table: MatTable<Element>;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private facultyService: FacultiesService,
    private paginatorService: PaginatorService) { }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  // getPaginator(paginator: MatPaginator) {
  //   this.dataSource.paginator = paginator;
  // }

  getFaculties() {
    this.facultyService.findAllFaculties()
    .subscribe(data => this.dataSource.data = data);
}


  addFaculty(faculty: Faculty) {
    this.apiService.createEntity('Faculty', faculty)
      .subscribe(response => {
        // this.dataSource.data = [...this.dataSource.data, response[0]];
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

  facultyModal(facultyObj?: Faculty) {
    if (!facultyObj) {
      this.facultyService.FacultyDialog((faculty: Faculty) => this.addFaculty(faculty));
    } else {
      this.facultyService.FacultyDialog((faculty: Faculty) => { this.updateFaculty(facultyObj.faculty_id, faculty); }, facultyObj);
    }
  }

  updateFaculty(id: number, faculty: Faculty) {
    this.apiService.updEntity('Faculty', faculty, id)
      .subscribe(response => {
        this.openSnackBar('Факультет оновлено');
        this.getFaculties();
      },
        err => {
          if (err.error.response.includes('Error when update')) {
            this.openSnackBar('Інформація про факультет не змінювалась');
          }
        }
      );
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
       // this.paginatorService.getCountRecords('Faculty');
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
