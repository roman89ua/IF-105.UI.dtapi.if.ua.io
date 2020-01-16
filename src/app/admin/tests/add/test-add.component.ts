import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../shared/http.service';
import { Faculty, DialogData } from '../../../shared/entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from '../../entity.interface';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss']
})
export class TestAddComponent implements OnInit {
  subjects: Subject[] = [];
  faculties: Faculty[] = [];

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<TestAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.httpService
      .getRecords('subject')
      .subscribe((result: Subject[]) => {
        this.subjects = result;
      });
    this.httpService.getRecords('faculty').subscribe((result: Faculty[]) => {
      this.faculties = result;
    });
  }
}
