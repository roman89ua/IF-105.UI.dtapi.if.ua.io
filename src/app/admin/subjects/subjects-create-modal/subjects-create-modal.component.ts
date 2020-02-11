import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'src/app/admin/entity.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subjects-create-modal',
  templateUrl: './subjects-create-modal.component.html',
  styleUrls: ['./subjects-create-modal.component.scss'],
})
export class SubjectsCreateModalComponent implements OnInit {
  constructor(
    public newDialogSubject: MatDialogRef<SubjectsCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subject,
    private translate: TranslateService
    ) { }

  @ViewChild('addSubject', { static: false }) addsubject;

  public addSubject = new FormGroup({
    subject_name: new FormControl('', [Validators.required, Validators.pattern(`[А-ЯІїЄ -]+[А-ЯЄІа-яіїє0-9 ':-]*`)]),
    subject_description: new FormControl('', [Validators.required, Validators.pattern(`[А-ЯІїЄ -]+[А-ЯЄІа-яіїє0-9 ':-]*`)])
  });

  onSubmit(): void {
    this.newDialogSubject.close(this.addSubject.value);
  }

  onDismiss(): void  {
    this.newDialogSubject.close();
  }

  get subject_name() {
    return this.addSubject.get('subject_name') as FormControl;
  }

  get subject_description() {
    return this.addSubject.get('subject_description') as FormControl;
  }

  getErrorMessage(field: FormControl) {
    return field.hasError('required') ? this.translate.instant('subjects.formErrorRequired') :
      field.hasError('pattern') ? this.translate.instant('subjects.formErrorPattern') :
      this.translate.instant('subjects.formErrorMinMax');
  }

  ngOnInit() {
    if (this.data) {
      this.addSubject.patchValue({
        subject_name: this.data.subject_name,
        subject_description: this.data.subject_description,
      });
    }
  }
}
