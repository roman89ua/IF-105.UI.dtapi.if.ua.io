import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ResponseInterface } from 'src/app/shared/entity.interface';

import { StudentsModalWindowComponent } from './students-modal-window/students-modal-window.component';
import { TransferStudentModalWindowComponent } from './transfer-student-modal-window/transfer-student-modal-window.component';
import { ViewStudentModalWindowComponent } from './view-student-modal-window/view-student-modal-window.component';

import { Student } from 'src/app/shared/entity.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {

  public isLoading = true;
  public updateData: boolean;
  public submitButtonText: string;
  public groupdID: number;
  public STUDENTS_LIST: Student[] = [];
  public displayedColumns: string[] = ['numeration', 'gradebookID', 'studentNSF', 'UpdateDelete'];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.showStudentsByGroup();
  }

  showStudentsByGroup() {
    this.groupdID = this.activatedRoute.snapshot.params['id'];
    this.apiService.getEntityByAction('Student', 'getStudentsByGroup', this.groupdID).subscribe((result: any) => {
      if (result.response === 'no records') {
        return this.STUDENTS_LIST = undefined;
      } else {
        this.STUDENTS_LIST = result;
        this.isLoading = false;
      }
    },
    (error: ResponseInterface) => {
      this.modalService.openErrorModal('Можливі проблеми із сервером');
    });
  }

  addStudent() {
    this.submitButtonText = 'Додати студента';
    this.updateData = false;
    this.showModalWindow(this.submitButtonText, this.updateData).afterClosed().subscribe((response) => {
      if (!response) {
        return this.showSnackBar('НЕМАЄ ВІДПОВІДІ ВІД СЕРВЕРУ. МОЖЛИВІ ПРОБЛЕМИ З ПІДКЛЮЧЕННЯМ АБО СЕРВЕРОМ');
      } else if (response.response === 'ok') {
        this.showStudentsByGroup();
        return this.showSnackBar('Студент доданий, дані збережено');
      } else if (response === 'Canceled') {
        return this.showSnackBar('Скасовано');
      }
    });
  }

  editStudent(student: Student) {
    this.submitButtonText = 'Змінити дані студента';
    this.updateData = true;
    this.showModalWindow(this.submitButtonText, this.updateData,  student)
        .afterClosed().subscribe((response) => {
        if (!response) {
          return this.showSnackBar('НЕМАЄ ВІДПОВІДІ ВІД СЕРВЕРУ. МОЖЛИВІ ПРОБЛЕМИ З ПІДКЛЮЧЕННЯМ АБО СЕРВЕРОМ');
        } else if (response.response === 'ok') {
          this.showStudentsByGroup();
          return this.showSnackBar('Дані студента змінено та збережено');
        } else if (response === 'Canceled') {
          return this.showSnackBar('Скасовано');
        }
    });
  }

  deleteStudent(id: string) {
    const idNum = Number.parseInt(id, 10);
    this.apiService.delEntity('Student', idNum).subscribe((data: { response?: string; } ) => {
      if (data && data.response === 'ok') {
        this.STUDENTS_LIST = this.STUDENTS_LIST.filter(student => student.user_id !== id);
        return this.showSnackBar('Студент видалений, дані збережено');
      }
    });
  }

  transferStudent(student: Student) {
    this.showTransferStudentModalWindow(student)
      .afterClosed().subscribe((response) => {
        if (!response) {
          return this.showSnackBar('НЕМАЄ ВІДПОВІДІ ВІД СЕРВЕРУ. МОЖЛИВІ ПРОБЛЕМИ З ПІДКЛЮЧЕННЯМ АБО СЕРВЕРОМ');
        } else if (response.response === 'ok') {
          this.showStudentsByGroup();
          return this.showSnackBar('Студент переведений');
        } else if (response === 'Canceled') {
          return this.showSnackBar('Скасовано');
        }
    });
  }

  openConfirmDialog(name: string, surname: string, id: string) {
    const message = `Підтвердіть видалення користувача "${surname} ${name}"`;
    return this.modalService.openConfirmModal(message, () => this.deleteStudent(id));
  }

  showSnackBar(message: string) {
    return this.matSnackBar.open(message, '', {
      duration: 3000,
    });
  }

  showModalWindow(buttonText: string, edit?: boolean, student?: Student) {
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

  showTransferStudentModalWindow(student: Student) {
    return this.dialog.open(TransferStudentModalWindowComponent, {
      disableClose: true,
      width: '600px',
      data: {
          group_id: this.groupdID,
          student_data: student
      }
    });
  }

  showViewStudentModalWindow(student: Student) {
    return this.dialog.open(ViewStudentModalWindowComponent, {
      disableClose: true,
      width: '700px',
      panelClass: 'student-view-dialog-container',
      data: {
          group_id: this.groupdID,
          student_data: student
      }
    });
  }
}
