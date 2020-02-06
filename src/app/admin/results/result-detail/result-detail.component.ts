import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ResultsService } from '../results.service';
import {Results, TrueAnswers} from '../../entity.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatTable, MatTableDataSource } from '@angular/material';
import { IQuestion } from '../../questions/questions';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-detail-result',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
  isLoaded: boolean = false;
  listQuestionsByTest: IQuestion[];
  dataSource = new MatTableDataSource<TrueAnswers>();
  displayedColumns: string[] = [
    'id',
    'question',
    'answer',
  ];

  @ViewChild('table', { static: true }) table: MatTable<Results>;

  constructor(
    public resultsService: ResultsService,
    public dialogRef: MatDialogRef<ResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,
    ) {
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.resultsService.getQuestions(this.getIdQuestions(this.data.detail))
      .subscribe(result => {
        this.listQuestionsByTest = result;
        this.isLoaded = true;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    this.dataSource.data = this.resultsService.getDetailResult(this.data.detail);
  }

  private getIdQuestions(list: string): number[] {
    const ids: number[] = [];
    for (const item of JSON.parse(list)) {
      ids.push(item.question_id);
    }
    return ids;
  }

}
