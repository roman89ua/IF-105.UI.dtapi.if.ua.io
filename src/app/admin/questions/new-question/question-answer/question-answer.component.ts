import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { QuestionService } from '../../questions.service';
import { IQuestion } from '../../questions';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  @Input() questionAnswer: any;  //FIX
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
    answer_text: new FormControl('', [this.answerContentAdded()]),
    true_answer: new FormControl(''),
    attachment: new FormControl('')
  });

  answerContentAdded(): ValidatorFn {
    return (control: AbstractControl) => {
      let invalid = false;
      if (+this.questionType === 4 && this.questionAnswer.error) {
        invalid = true
        console.log(invalid);
      }
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
    console.log('emiting');
    this.answerDataChange.emit({
      answer_id: this.questionAnswer.answer_id,
      ...this.answerForm.value,
      error: this.questionAnswer.error,
      touched: true, //FIX
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

  ngAfterViewInit() {
    console.log(111);
    this.answerText.markAsTouched();

  }

}