import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  @Input() questionAnswer: any;
  @Output() answerDataChange = new EventEmitter();

  constructor() { }

  answerForm = new FormGroup ({
    answer_text: new FormControl(''),
    true_answer: new FormControl(''),
  });

  changeAnswerDataHandler() {
    this.answerDataChange.emit({ id: this.questionAnswer.id, ...this.answerForm.value, attachment: '' })
  }

  ngOnInit() {
    this.answerForm.setValue({
       answer_text: this.questionAnswer.answer_text,
       true_answer: this.questionAnswer.true_answer
      })
  }

}
