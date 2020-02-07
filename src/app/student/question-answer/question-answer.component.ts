import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  @Input() choosenQuestion: any;
  @Input() choosenAnswer: any;
  @Output() onAnswerChange = new EventEmitter();
  @Output() mark = new EventEmitter();
  private checkboxAnswersList: any = [];
 
  ngOnInit() {
  }

  isSimpleChoiceChecked(id: number) {
    return this.choosenAnswer ? id === this.choosenAnswer.answer : false;
  }

  isMultiChoiceChecked(id: any) {
    return this.choosenAnswer ? this.choosenAnswer.answer.includes(id) : false;
  }

  getRadioAnswer(id: number) {
    this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: id})
  }
  
  getCheckboxAnswer(answerId: any) {
    if(this.checkboxAnswersList.includes(answerId)) {
      this.checkboxAnswersList = this.checkboxAnswersList.filter(checkboxAnswerList => {
        return checkboxAnswerList !== answerId;
      })
      this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: this.checkboxAnswersList});
      return;
    }
    this.checkboxAnswersList = [...this.checkboxAnswersList, answerId];
    this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: this.checkboxAnswersList});
  }

  getInputAnswer(event: any) {
    this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: event.target.value})
  }

  getInputNumberAnswer(event: any) {
    this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: event.target.value})
  }

  markQuestion(id: string) {
    this.mark.emit(id);
  }
  // getInputValue(event) {
  //   this.answerFromInput= event.target.value;
  //   console.log(this.answerFromInput);
  // }
  
}
