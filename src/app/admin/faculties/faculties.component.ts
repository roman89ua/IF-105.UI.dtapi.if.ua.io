import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Faculty, FacultyService } from './faculties.service';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit, AfterViewInit {
  result: any;
  faculties: Faculty[] = [];
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  id: number;
  loading = false;

  dataSource = new MatTableDataSource<Faculty>();

  @ViewChild('addform', { static: false }) addform;
  @ViewChild('updateform', { static: false }) updateform;
  @ViewChild('table', { static: false }) table: MatTable<Element>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  addForm = new FormGroup({
    faculty_name: new FormControl('', [Validators.required, Validators.pattern('[а-яА-ЯіІїЄє ]*')]),
    faculty_description: new FormControl('', [Validators.required, Validators.pattern('[а-яА-ЯіІїЄє ]*')])
  });

  updateForm = new FormGroup({
    faculty_name: new FormControl('', [Validators.required, Validators.pattern('[а-яА-ЯіІїЄє ]*')]),
    faculty_description: new FormControl('', [Validators.required, Validators.pattern('[а-яА-ЯіІїєЄ ]*')])
  });

  constructor(
    private facultyService: FacultyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    });
  }

  closeDialog() {
    this.dialog.closeAll();
    this.updateform.resetForm();
  }

  ngOnInit(): void {
    this.getFaculty();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getFaculty() {
    this.loading = true;
    this.facultyService.getAllFaculty().subscribe(response => {
      this.dataSource.data = response;
      this.loading = false;
    });
  }

  addFaculty() {
    this.facultyService.addFaculty({ ...this.addForm.value }).subscribe(
      response => {
        this.dataSource.data = [...this.dataSource.data, response[0]];
        this.table.renderRows();
        this.openSnackBar('Факультет додано');
      },
      err => {
        this.openSnackBar('Такий факультет уже існує');
      }
    );
    this.addform.resetForm();
  }

  getObjectFromTable(templateRef: TemplateRef<any>, element: Faculty) {
    this.dialog.open(templateRef);
    this.updateForm.patchValue({
      faculty_name: element.faculty_name,
      faculty_description: element.faculty_description
    });
    this.id = element.faculty_id;
  }

  updateFaculty() {
    this.facultyService.updateFaculty(this.id, { ...this.updateForm.value }).subscribe(
      response => {
        this.getFaculty();
        this.closeDialog();
      },
      err => {
        if (err.error.response.match(/Duplicate entry/)) {
          this.closeDialog();
          this.openSnackBar('Такий факультет уже існує');
        }
      }
    );
    this.updateform.resetForm();
  }

  openComfirmDialog(faculty: Faculty) {
    const message = `Підтвердіть видалення факультету "${faculty.faculty_name}"?`;
    this.modalService.openConfirmModal(message, () => this.removeFaculty(faculty.faculty_id));
  }

  removeFaculty(id: number) {
    this.facultyService.removeFaculty(id).subscribe(response => {
      this.openSnackBar('Факультет видалено');
      this.dataSource.data = this.dataSource.data.filter(item => item.faculty_id !== id);
    });
  }

  getErrorMessageName(form: FormGroup) {
    return form.get('faculty_name').hasError('required')
      ? 'Це поле є обовязкове*'
      : form.get('faculty_name').hasError('pattern')
      ? 'Поле містить недопустимі символи або (Цифри, латинські букви)'
      : '';
  }

  getErrorMessageDescription(form: FormGroup) {
    return form.get('faculty_description').hasError('required')
      ? 'Це поле є обовязкове*'
      : form.get('faculty_description').hasError('pattern')
      ? 'Поле містить недопустимі символи або (Цифри, латинські букви)'
      : '';
  }
}
