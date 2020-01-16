import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subjects-create-modal',
  templateUrl: './subjects-create-modal.component.html',
  styleUrls: ['./subjects-create-modal.component.scss']
})
export class SubjectsCreateModalComponent implements OnInit {
  public addSubject = new FormGroup({
    subject_name: new FormControl('', [Validators.required]),
    subject_description: new FormControl('',[Validators.required])

  })
  
  constructor(private subjectsService: SubjectsService,  public newDialogSubject: MatDialogRef<SubjectsCreateModalComponent>) { }

  ngOnInit() {
  }
  
  createSubject(){
    this.newDialogSubject.close(this.addSubject.value)
  }

  cancelCreateNewSubject(){
    this.newDialogSubject.close();
  }
}
