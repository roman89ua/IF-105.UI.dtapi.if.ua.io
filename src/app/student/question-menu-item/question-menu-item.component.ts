import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-menu-item',
  templateUrl: './question-menu-item.component.html',
  styleUrls: ['./question-menu-item.component.scss']
})
export class QuestionMenuItemComponent implements OnInit {
  @Input() index: number;
  @Input() question: any;
  @Input() addedQuestionAnswer: any;
  @Input() isChoosen: boolean;
  @Input() markedQuestions: any;
  @Output() viewQuestionOutput = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  chooseQuestion() {
    this.viewQuestionOutput.emit(this.question.question_id);
  }

  isQuestionMarked() {
    return this.markedQuestions.find((question: number) => {
     return question === this.question.question_id;
    })
      return true;
    }
 
  changeStyle() {
    return !!this.addedQuestionAnswer.find((answer) => {
      return answer.question === this.question.question_id;
    });
  }
}
