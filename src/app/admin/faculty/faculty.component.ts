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

  addForm: FormGroup;
  updateForm: FormGroup;
  Facultys: Faculty[] = [];
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  id: number;

  @ViewChild('mytable', { static: true }) table: MatTable<Element>;

  constructor(private facultyService: FacultyService, private dialog: MatDialog) { }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      faculty_name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10)
        ]),
      faculty_description: new FormControl('',
        [
          Validators.required
        ])
    });

    this.updateForm = new FormGroup({
      faculty_name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10)
        ]),
      faculty_description: new FormControl('',
        [
          Validators.required
        ])
    });
    this.getFaculty();
  }

  getFaculty() {
    this.facultyService.getAllFaculty()
      .subscribe(response => {
        this.Facultys = response;
      });
  }

  addFaculty() {
    this.facultyService.addFaculty({ ...this.addForm.value })
      .subscribe(response => {
        this.Facultys.push(response[0]);
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
        this.Facultys = this.Facultys.filter(item => item.faculty_id !== id);
      });
  }

}
