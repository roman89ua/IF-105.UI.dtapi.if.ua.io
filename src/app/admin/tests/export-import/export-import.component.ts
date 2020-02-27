import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent implements OnInit {
  selectDetailDownloadForm: FormGroup;
  
  constructor( 
    public dialogRef: MatDialogRef<ExportImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,) { 
      this.dialogRef.disableClose = true;
      this.createForm();
    }

    private createForm() {
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
  onDismiss() {
    this.dialogRef.close();
  }
}
