import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { QuestionService } from '../../question.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  @Input() questionAnswer: any;
  @Input() questionType: number;
  @Input() index: number;
  @Output() answerDataChange = new EventEmitter();
  @Output() questionAnswerDelete = new EventEmitter();

  constructor(private questionService: QuestionService) { }
  attachmentTouched: boolean = false;

  get answerAttachment() {
    return this.answerForm.get('attachment');
  }

  get answerText() {
    return this.answerForm.get('answer_text');
  }

  answerForm = new FormGroup ({
    answer_text: new FormControl(''),
    true_answer: new FormControl(''),
    attachment: new FormControl('')
  }, {validators: this.answerContentAdded()});

  answerContentAdded(): ValidatorFn {
    return (control: FormGroup) => {
      let invalid = control.get('answer_text').value === '' && control.get('attachment').value === ''
      return invalid ? {'noAnswer': true} : null;
    }
  }

  removeImage(): void {
    this.setAttachmentValue('');
  }

  deleteAnswer(id: number): void {
    this.questionAnswerDelete.emit(id)
  }


  // MUST BE REFACTORED
  changeAnswerDataHandler() {
    let error
    if (this.answerForm.errors.noAnswer) {
      error = this.answerForm.errors.noAnswer;
    }
    else {
      error = '';
    }
    this.answerDataChange.emit({
      answer_id: this.questionAnswer.answer_id,
      ...this.answerForm.value,
      error: error
    })
  }

  private setAttachmentValue(value: string) {
    this.answerForm.get('attachment').setValue(value)
    this.attachmentTouched = true;
  }

  attachmentUploadHandler(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.questionService.toBase64(file)
        .subscribe((res:string) => { 
          this.setAttachmentValue(res)
          this.changeAnswerDataHandler();
        })
    } else {
      this.setAttachmentValue('');
      this.changeAnswerDataHandler();
    }
  }

  ngOnInit() {
    this.answerForm.setValue({
       answer_text: this.questionAnswer.answer_text,
       true_answer: this.questionAnswer.true_answer,
       attachment: this.questionAnswer.attachment
      })
  }

}
