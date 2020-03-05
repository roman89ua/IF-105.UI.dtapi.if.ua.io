import { Component, OnInit, Inject } from '@angular/core';
import { ResultsService } from '../results.service';
import { ModalService } from '../../../shared/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IAnswer } from '../../questions/questions';
import { UserAnswers } from 'src/app/shared/entity.interface';

@Component({
  selector: 'app-results-question-detail',
  templateUrl: './results-question-detail.component.html',
  styleUrls: ['./results-question-detail.component.scss']
})

export class ResultsQuestionDetailComponent implements OnInit {

  constructor(private resultService: ResultsService,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

  isAnswerChecked(answer: IAnswer, userAnswerIds: number[]): boolean {
    if (userAnswerIds.some(item => item == answer.answer_id)) {
      return true;
    } else {
      return false;
    }
  }

}
