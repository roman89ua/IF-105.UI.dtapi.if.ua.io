import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnChanges {
  @Input() choosenQuestion: any;
  @Input() choosenAnswer: any;
  @Output() onAnswerChange = new EventEmitter();
  @Output() mark = new EventEmitter();
  private checkboxAnswersList: any = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.choosenQuestion) {
      return;
    }
    if (changes.choosenQuestion && (this.choosenQuestion.type === "1" || this.choosenQuestion.type === "2")) {
      this.choosenQuestion.shuffledAnswers = this.shuffle(this.choosenQuestion.answers);
    }
  }

  isSimpleChoiceChecked(id: number) {
    return this.choosenAnswer ? id === this.choosenAnswer.answer : false;
  }

  isMultiChoiceChecked(id: any) {
    return this.choosenAnswer ? this.choosenAnswer.answer.includes(id) : false;
  }

  getAttachmentUrl(attachment) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(attachment);
  }

  getRadioAnswer(id: number) {
    this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: id})
  }

  shuffle(answers) {
    if (!answers || !answers.length) {
      return [];
    }
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
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
    this.onAnswerChange.emit({question: this.choosenQuestion.question_id, answer: +event.target.value})
  }

  markQuestion(id: string) {
    this.mark.emit(id);
  }
}

