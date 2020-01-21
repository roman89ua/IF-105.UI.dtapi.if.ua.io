import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormControl, FormGroup, Validators } from '@angular/forms';
=======
import { FormControl, FormGroup, Validators} from '@angular/forms';
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
import { MatDialogRef } from '@angular/material';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subjects-create-modal',
  templateUrl: './subjects-create-modal.component.html',
  styleUrls: ['./subjects-create-modal.component.scss']
})
export class SubjectsCreateModalComponent implements OnInit {
  public addSubject = new FormGroup({
<<<<<<< HEAD
    subject_name: new FormControl('', [Validators.required]),
    subject_description: new FormControl('', [Validators.required])

  });

  constructor(private subjectsService: SubjectsService, public newDialogSubject: MatDialogRef<SubjectsCreateModalComponent>) { }
=======
    subject_name: new FormControl('', [Validators.required, Validators.pattern("[А-ЯІїЄ -]+[А-ЯЄІа-яіїє0-9 ':-]*")]),
    subject_description: new FormControl('', [Validators.required, Validators.pattern("[А-ЯІїЄ -]+[А-ЯЄІа-яіїє0-9 ':-]*")])
  });
  constructor(private subjectsService: SubjectsService,  public newDialogSubject: MatDialogRef<SubjectsCreateModalComponent>) { }
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4

  ngOnInit() {
  }
  createSubject() {
    this.newDialogSubject.close(this.addSubject.value);
  }

  cancelCreateNewSubject() {
    this.newDialogSubject.close();
  }
}
