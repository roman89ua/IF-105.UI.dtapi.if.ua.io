import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ResultsService } from '../results.service';
import {Results, TrueAnswers} from '../../entity.interface';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IQuestion, IAnswer } from '../../questions/questions';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ResultsQuestionDetailComponent } from '../results-question-detail/results-question-detail.component'
import { UserAnswers } from 'src/app/shared/entity.interface';

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
    'counter',
    'id',
    'question',
    'answer',
    'action',
  ];

  @ViewChild('table', { static: true }) table: MatTable<Results>;

  constructor(
    public resultsService: ResultsService,
    public dialogRef: MatDialogRef<ResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,
    public dialog: MatDialog,
    ) {
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.resultsService.getQuestions(this.getIdQuestions(this.data.detail.true_answers))
      .subscribe(result => {
        this.listQuestionsByTest = result;
        this.isLoaded = true;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    this.dataSource.data = this.resultsService.getDetailResult(this.data.detail.true_answers);
  }

  private getIdQuestions(list: string): number[] {
    const ids: number[] = [];
    for (const item of JSON.parse(list)) {
      ids.push(item.question_id);
    }
    return ids;
  }

  private createQuestionDetailModad(question: IQuestion, answers: IAnswer[], userAnswerIds: number[]): void {
    this.dialog.open(ResultsQuestionDetailComponent, {
      width: '1000px',
      data: {
        question,
        answers,
        userAnswerIds,
      }
    });
  }
  private getUserAnswersByQuestion(question_id: number, userAnswers: UserAnswers[]): number[] {
    let [userAnswersByQuestion] = userAnswers.filter(item => item.question_id == question_id);
    return userAnswersByQuestion.answer_ids;
  }
  openModal(test_id: number) {
    this.resultsService.getQuestionWithAnswers(test_id).subscribe(([question, answers]) => {
      let question_id = question[0].question_id;
      const userAnswerIds = this.getUserAnswersByQuestion(question_id, this.data.listUserAnswers);
      this.createQuestionDetailModad(question[0], answers, userAnswerIds);
    });
  }
}
