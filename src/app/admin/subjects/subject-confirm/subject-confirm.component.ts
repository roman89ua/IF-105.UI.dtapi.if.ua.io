import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectsService } from '../subjects.service';
import { ISubjects } from '../subjects.interface';
import { DialogData } from '../../entity.interface';
import { SubjectsCreateModalComponent } from '../subjects-create-modal/subjects-create-modal.component';


@Component({
  selector: 'app-subject-confirm',
  templateUrl: './subject-confirm.component.html',
  styleUrls: ['./subject-confirm.component.scss']
})
export class SubjectConfirmComponent implements OnInit {
  confirm: string;
  constructor(public newDialogSubject: MatDialogRef<SubjectConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
  }
  onCancel() {
    this.newDialogSubject.close(null);
  }
  onConfirm() {
    this.newDialogSubject.close(true);
  }

  ngOnInit() {

    this.confirm = this.data;
    console.log(this.data);
  }

}

