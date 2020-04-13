import { Component, OnInit, Inject } from '@angular/core';
import { ResultsService } from '../results.service';
import { ModalService } from '../../../shared/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  isNoAnswer(): boolean {
    return !this.data.userAnswerIds[0];
  }
  isAnswerText(): boolean {
    return this.data.question.type == 3 || this.data.question.type == 4; 
  }
  getTextTrueAnswer(): string {
    const trueAnswers = this.data.answers.filter(answer => {
      return this.data.userAnswerIds.some( id => id == answer.answer_id ); 
    });
    const trueAnswersText = trueAnswers.map(element => {
      return element.answer_text;
    })
    return trueAnswersText.join(",");
  }

}
