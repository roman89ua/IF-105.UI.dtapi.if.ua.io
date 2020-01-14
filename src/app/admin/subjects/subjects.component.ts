import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubjectsCreateModalComponent } from './subjects-create-modal/subjects-create-modal.component';
import {SubjectsService} from './subjects.service';
import {SSubjects} from './subjects.interface';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  createNewSubject(){
    const newDialogSubject = this.dialog.open(SubjectsCreateModalComponent,{
      width: '500px',
      disableClose: true,
    });
  }
}
