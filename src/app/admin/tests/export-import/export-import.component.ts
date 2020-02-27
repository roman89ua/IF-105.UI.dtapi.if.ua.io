import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportService } from '../../../shared/services/import.service';
import { ModalService } from '../../../shared/services/modal.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent implements OnInit {
  selectDetailDownloadForm: FormGroup;
  isDownload: boolean = false;
  isUpload: boolean = false;
  levelQuestion = environment.levelQuestion;
  selectedLevel: number = null;
  
  constructor( 
    public dialogRef: MatDialogRef<ExportImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private importService: ImportService,
    private modalService:ModalService,
    ) { 
      this.dialogRef.disableClose = true;
      this.createForms();
    }

    private createForms() {
      this.selectDetailDownloadForm = this.fb.group({
        test_id: [this.data.test_id],
        level: [null, Validators.required]
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    const result = this.selectDetailDownloadForm.value;
    this.dialogRef.close(result);
  }

  openDownloadForm() {
    if (this.data.level) {
      this.isDownload = true;
    } else {
      this.modalService.openErrorModal('В даному тесті відсутні запитання');
    }
  }

  openUploadForm() {
    this.isUpload = true;
  }

  /** Upload file */
  changeClient(value: number) {
    this.selectedLevel = value;
}

  onFileSelected(test_id: number) {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        const listQuestions = JSON.parse(e.target.result, null);
        this.importService.uploadQuestions(listQuestions, test_id, this.selectedLevel);
      };
      reader.readAsText(inputNode.files[0]);
    } else {
      this.modalService.openErrorModal('Помилка при зчитуванні файлу');
    } 
    this.onDismiss();
  }

  onDismiss() {
    this.dialogRef.close();
  }

}
