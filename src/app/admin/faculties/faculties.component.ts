import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent } from '@angular/material';
import { Faculty } from 'src/app/shared/entity.interface';
import { ModalService } from '../../shared/services/modal.service';
import { FacultiesService } from './faculties.service';
import { PaginationModel } from 'src/app/shared/mat-table/PaginationModel';
import { ApiService } from 'src/app/shared/services/api.service';
import { Column, tableActionsType } from 'src/app/shared/mat-table/mat-table.interface';
import { TableAction } from 'src/app/shared/mat-table/TableAction';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent extends PaginationModel implements OnInit, AfterViewInit {

  /* TABLE  */
  dataSource = new MatTableDataSource<Faculty>();


  columns: Column [] = [
    {columnDef: 'faculty_id', header: 'ID'},
    {columnDef: 'faculty_name', header: 'Факультети'},
    {columnDef: 'faculty_description', header: 'Опис'},
    {columnDef: 'action', header: 'Дії', actions: [
      {type: tableActionsType.Edit, icon: 'edit', matTooltip: 'Редагувати', aria_label: 'edit'},
      {type: tableActionsType.Remove, icon: 'delete', matTooltip: 'Видалити', aria_label: 'delete'}
    ]}
  ];

  /* for Paginator */
  length: number;


  constructor(
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private facultyService: FacultiesService,
    apiService: ApiService) {
      super('Faculty', apiService);
  }

  ngOnInit(): void {}

  pageUpdate(event: PageEvent) {
    this.pageChange(event);
    this.getRange(data => this.dataSource.data = data);
    this.getCountRecords(response => this.length = response.numberOfRecords);
  }
  ngAfterViewInit(): void { }

  getAction({type, body}: {type: tableActionsType, body: Faculty} ) {
    TableAction.getAction(type,
      () => {this.openFacultyModal(body)},
      () => {this.openConfirmDialog(body)}
      );

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
        this.getRange(data => this.dataSource.data = data);
        this.length++;
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
   const [...newArray] = this.dataSource.data;
   this.facultyService.updateFaculty(id, faculty)
      .subscribe((response: Faculty[]) => {
        this.openSnackBar('Факультет оновлено');
        newArray[newArray.findIndex(el => el.faculty_id === id)] = {
          ...response[0]
        };
        this.dataSource.data = newArray;
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
        this.dataSource.data = this.dataSource.data.filter(item => item.faculty_id !== id);
        this.openSnackBar('Факультет видалено');
        if (this.dataSource.data.length > 0) { this.length--; }
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
