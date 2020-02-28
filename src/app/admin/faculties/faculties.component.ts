import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { Faculty, Column, tableActionsType } from 'src/app/shared/entity.interface';
import { ModalService } from '../../shared/services/modal.service';
import { FacultiesService } from './faculties.service';
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

  columns: Column [] = [
    {columnDef: 'faculty_id', header: 'ID'},
    {columnDef: 'faculty_name', header: 'Факультети'},
    {columnDef: 'faculty_description', header: 'Опис'},
    {columnDef: 'action', header: 'Дії', actions: [
      {type: tableActionsType.Edit, icon: 'edit', matTooltip: 'Редагувати', aria_label: 'edit'},
      {type: tableActionsType.Delete, icon: 'delete', matTooltip: 'Видалити', aria_label: 'delete'}
    ]}
  ];

  /* for Paginator component */
  length: number;
  paginator: PaginationModel;
  matpaginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private facultyService: FacultiesService,
    private paginatorService: PaginatorService) { }

  /*            For Paginator component        */
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
    this.paginatorService.getCountRecords('Faculty')
      .subscribe(data => this.length = data.numberOfRecords);
  }

  /*        *****************************************       */

  ngOnInit(): void {}

  ngAfterViewInit(): void { }

  getAction({actiontype: type, body: {...faculty }}: {actiontype: tableActionsType, body: Faculty} ) {
    const action = {
      edit: () => {
        this.openFacultyModal(faculty)
      },
      delete: () => {
        this.openConfirmDialog(faculty)
      }
    };
    action[type]();

  }
  openFacultyModal(facultyObj?: Faculty) {
    if (!facultyObj) {
      this.facultyService.openAddFacultyDialog()
        .subscribe((dialogResult: Faculty) => {
          if (dialogResult) {
          this.createFaculty(dialogResult);
          }});
    } else {
      this.facultyService.openAddFacultyDialog(facultyObj)
        .subscribe((dialogResult: Faculty) => {
          if (dialogResult) {
            this.updateFaculty(facultyObj.faculty_id, dialogResult);
          }
        });
    }
  }

  createFaculty(faculty: Faculty) {
    this.facultyService.createFaculty(faculty)
      .subscribe(() => {
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
    this.facultyService.updateFaculty(id, faculty)
      .subscribe(() => {
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

  openConfirmDialog(faculty: Faculty) {
    const message = `Підтвердіть видалення факультету "${faculty.faculty_name}"?`;
    this.modalService.openConfirmModal(message, () => this.removeFaculty(faculty.faculty_id));
  }


  removeFaculty(id: number) {
    this.facultyService.deleteFaculty(id)
      .subscribe(() => {
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
