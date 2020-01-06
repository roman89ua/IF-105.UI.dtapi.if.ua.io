import { Component, OnInit } from '@angular/core';
import { Faculty, FacultyService } from './faculty.service';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatTableDataSource, MatTable, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  loading = false;

  addForm = new FormGroup({
    faculty_name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[а-яА-ЯіІї ]*')
      ]),
    faculty_description: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[а-яА-ЯіІї ]*')
      ])
  });



  updateForm = new FormGroup({
    faculty_name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[а-яА-ЯіІї ]*')
      ]),
    faculty_description: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[а-яА-ЯіІї ]*')
      ])
  });


  Faculties: Faculty[] = [];
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  id: number;

  @ViewChild('mytable', { static: false }) table: MatTable<Element>;

  constructor(private facultyService: FacultyService, private dialog: MatDialog) { }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.getFaculty();
  }

  getFaculty() {
    this.loading = true;
    this.facultyService.getAllFaculty()
      .subscribe(response => {
        this.Faculties = response;
        this.loading = false;
      });
  }

  addFaculty() {
    this.facultyService.addFaculty({ ...this.addForm.value })
      .subscribe(response => {
        this.Faculties.push(response[0]);
        this.table.renderRows();
      });
    this.addForm.reset();
  }

  getObjectFromTable(templateRef: TemplateRef<any>, element: Faculty) {
    this.dialog.open(templateRef);
    this.updateForm.patchValue({
      faculty_name: element.faculty_name,
      faculty_description: element.faculty_description,
    });
    this.id = element.faculty_id;
  }

  updateFaculty() {

    this.facultyService.updateFaculty(this.id, { ...this.updateForm.value })
      .subscribe(response => {
        this.getFaculty();
      });
    this.updateForm.reset();
  }

  removeFaculty(id: number) {
    this.facultyService.removeFaculty(id)
      .subscribe((response) => {
        this.Faculties = this.Faculties.filter(item => item.faculty_id !== id);
      });
  }
  getErrorMessageName() {
    return this.get('faculty_name').hasError('required') ? 'Це поле є обовязкове*' :
      this.get('faculty_name').hasError('pattern') ? 'Поле містить недопустимі символи(Цифри або латинські букви)' :
        '';
  }
  getErrorMessageDescription() {
    return this.get('faculty_description').hasError('required') ? 'Це поле є обовязкове*' :
      this.get('faculty_description').hasError('pattern') ? 'Поле містить недопустимі символи (Цифри або латинські букви)' :
        '';
  }
}
