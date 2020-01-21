import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
// import { DialogService } from 'src/app/shared/dialog.service';
=======
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
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

  public groupdID: number;
  public STUDENTS_LIST: GetStudentsInterface[];
  public displayedColumns: string[] = ['gradebookID', 'studentName', 'studentSurname', 'UpdateDelete'];

  constructor(
    private studentsHttpService: StudentsService,
<<<<<<< HEAD
    // public dialogService: DialogService,
=======
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
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
    this.studentsHttpService.getStudentsByGroup(this.groupdID).subscribe((result: Array<GetStudentsInterface>) => {
      this.STUDENTS_LIST = result;
    });
  }
<<<<<<< HEAD
  openConfirmDialog(name: string, surname: string, id: string) {
    const message = `Підтвердіть видалення користувача "${surname} ${name}"`;
    this.modalService.openConfirmModal(message, () => this.delStudent(id));
=======
  ////////////////////////

  // Students Adding
  addStudent(): void {
    this.showModalWindow().afterClosed().subscribe((response: any) => {
      if (response) {
          if (response.response === 'ok') {
            this.showSnackBar('Студент доданий, дані збережено');
            this.showStudentsByGroup();            
          } else if (response.error || response.response === 'Failed to validate array') {
            this.showSnackBar('ПОМИЛКА');
          }
      }
    });
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
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

  showModalWindow() {
    return this.dialog.open(StudentsModalWindowComponent, {
      disableClose: true,
      width: '600px',
      height: 'calc(100vh - 50px)',
      data: {
          group_id: this.groupdID,
      }
    });
  }

}
