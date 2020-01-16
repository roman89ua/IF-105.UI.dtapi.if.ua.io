import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentsService } from './services/students.service';
import { GetStudentsInterface } from './interfaces/get-students-interface';
import { CreareUpdateStudentsInterface } from './interfaces/creare-update-students-interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  groupdID: number;

  public STUDENTS_LIST: Array<GetStudentsInterface> = [];
  public STUDENTS_DATA: Array<CreareUpdateStudentsInterface> = [];
  public displayedColumns: string[] = ['gradebookID', 'studentName', 'studentSurname', 'UpdateDelete'];

  constructor(
    private studentsHttpService: StudentsService,
    public dialogService: DialogService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getGroupId();
    this.showStudentsByGroup(this.groupdID);
  }

  getGroupId() {
    this.groupdID = this.activatedRoute.snapshot.params['id'];
  }

  showStudentsByGroup(id) {
    this.studentsHttpService.getStudentsByGroup(id).subscribe((result: Array<GetStudentsInterface>) => {
      this.STUDENTS_LIST = result;
    });
  }

  deleteStudent(name: string, id: string) {
    this.dialogService.openConfirmDialog({name, id})
    .pipe(
      mergeMap((result: any) => {
        if (result.isCanceled) {
          return of(result);
        }
        return this.studentsHttpService.deleteStudent(result.id);
      })
    )
    .subscribe((result: any) => {
      if (result && result.isCanceled) {
        return;
      }
      if (result && result.response === 'ok') {
        this.STUDENTS_LIST = this.STUDENTS_LIST.filter(student => student.user_id !== id);
      }
    });
  }

}
