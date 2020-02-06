import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ResultsService } from '../results.service'
import { Results, TrueAnswers } from '../../entity.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { IQuestion } from '../../questions/questions';

@Component({
  selector: 'app-detail-result',
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.scss']
})
export class DetailResultComponent implements OnInit {
  isLoaded: boolean = false;
  listQuetionsByTest: IQuestion[];
  dataSource = new MatTableDataSource<Results>();
  displayedColumns: string[] = [
    'id',
    'question',
    'answer',
  ];

  @ViewChild('table', { static: true }) table: MatTable<Results>;

  constructor(public resultsService: ResultsService,
    public dialogRef: MatDialogRef<DetailResultComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.resultsService.getQuestions(this.getIdQuestions(this.data.detail))
      .subscribe(result => {
        this.listQuetionsByTest = result;
        this.isLoaded = true;
        //this.dataSource.data = this.resultsService.getDetailResult(this.data.detail);
      });
    console.log(this.listQuetionsByTest);
    this.dataSource.data = this.resultsService.getDetailResult(this.data.detail);
  }

  private getIdQuestions(list: string): number[] {
    let ids: number[] = [];
    for (let item of JSON.parse(list)) {
      ids.push(item.question_id);
    }
    return ids;
  }

}
