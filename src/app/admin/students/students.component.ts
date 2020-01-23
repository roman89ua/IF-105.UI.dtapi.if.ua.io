import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalService } from '../../shared/services/modal.service';

import { StudentsModalWindowComponent } from './students-modal-window/students-modal-window.component';
import { StudentsService } from './services/students.service';
import { GetStudentsInterface } from './interfaces/get-students-interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public isLoading: boolean = true;
  public updateData: boolean;
  public submitButtonText: string;
  public groupdID: number;
  public STUDENTS_LIST: GetStudentsInterface[] = [];
  public displayedColumns: string[] = ['numeration', 'gradebookID', 'studentNSF', 'UpdateDelete'];

  constructor(
    private studentsHttpService: StudentsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.showStudentsByGroup();
  }

  // Students showing
  showStudentsByGroup() {
    this.groupdID = this.activatedRoute.snapshot.params['id'];
    this.studentsHttpService.getStudentsByGroup(this.groupdID).subscribe((result: any) => {
      if (result === 'no records'){
        return;
      }
      this.STUDENTS_LIST = result;
      this.isLoading = false;
    });
  }
  ////////////////////////


  // Students Adding
  addStudent(): void {
    this.submitButtonText = 'Додати студента';
    this.updateData = false;
    this.showModalWindow(this.submitButtonText, this.updateData).afterClosed().subscribe((response) => {
      if (response) {
          if (response.response === 'ok') {
            this.showSnackBar('Студент доданий, дані збережено');
            this.showStudentsByGroup();            
          } else if (response === 'Canceled'){
            this.showSnackBar('Скасовано');
          } else if (response.error || response.response === 'Failed to validate array') {
            this.showSnackBar('ПОМИЛКА');
          }
      }
    });
  }
  ////////////////////////


  // Students updating
  editStudent(student: GetStudentsInterface): void {
    this.submitButtonText = 'Змінити дані студента';
    this.updateData = true;
    this.showModalWindow(this.submitButtonText, this.updateData,  student)
        .afterClosed().subscribe((response) => {
        if (response) {
          if (response.response === 'ok') {
            this.showSnackBar('Дані студента змінено та збережено');
            this.showStudentsByGroup();            
          } else if (response === 'Canceled'){
            this.showSnackBar('Скасовано'); 
          } else if (response.error || response.response === 'Failed to validate array') {
            this.showSnackBar('ПОМИЛКА');
          }
        }
    });
  }
  ////////////////////////


  // Students removing
  deleteStudent(id: string) {
    const id_num = Number.parseInt(id);
    this.studentsHttpService.deleteStudent(id_num).subscribe((data: { response?: string; } ) => {
      if (data && data.response === 'ok') {
        this.STUDENTS_LIST = this.STUDENTS_LIST.filter(student => student.user_id !== id);
        this.showSnackBar('Студент видалений, дані збережено');
      }
    });
  }

  openConfirmDialog(name: string, surname: string, id: string) {
    const message = `Підтвердіть видалення користувача "${surname} ${name}"`;
    this.modalService.openConfirmModal(message, () => this.deleteStudent(id));  
  }
  ////////////////////////


  // Open Modal Window and SnackBar
  showSnackBar(message: string) {
    this.matSnackBar.open(message, '', {
      duration: 3000,
    });
  }

  showModalWindow(buttonText: string, edit?: boolean, student?: GetStudentsInterface) {
    return this.dialog.open(StudentsModalWindowComponent, {
      disableClose: true,
      width: '600px',
      height: 'calc(100vh - 50px)',
      data: {
          group_id: this.groupdID,
          student_data: student,
          updateStudent: edit,
          submitButtonText: buttonText,
      }
    });
  }
}
