import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubjectsCreateModalComponent } from './subjects-create-modal/subjects-create-modal.component';
import { SubjectsService } from './subjects.service';
import { SSubjects } from './subjects.interface';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  public subjectTableList: Array<SSubjects> = [];

  constructor(public dialog: MatDialog, public subjectsService: SubjectsService) {}

  ngOnInit() {}
  // create modal window
  createNewSubject() {
    const newDialogSubject = this.dialog.open(SubjectsCreateModalComponent, {
      width: '500px',
      disableClose: true
    });
    // create new subject at API
    newDialogSubject
      .afterClosed()
      .pipe(
        mergeMap(data => {
          if (data) {
            return this.subjectsService.creatSubject(data);
          }
          return of(null);
        })
      )
      .subscribe((newData: SSubjects | null) => {
        if (newData) {
          this.subjectTableList = [newData, ...this.subjectTableList];
        }
      });
  }
}
