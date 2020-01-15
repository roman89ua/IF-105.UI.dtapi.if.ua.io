import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private questionService: QuestionService) { }

  answerForm = new FormGroup ({
    answer_text: new FormControl(''),
    true_answer: new FormControl(''),
    attachment: new FormControl('')
  });

  get questionAttachment() {
    return this.answerForm.get('attachment');
  }

  changeAnswerDataHandler() {
    this.answerDataChange.emit({ id: this.questionAnswer.id, ...this.answerForm.value, attachment: '' })
  }

  private setAttachmentValue(value) {
    this.answerForm.get('attachment').setValue(value)
  }

  attachmentUploadHandler(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.questionService.toBase64(file)
        .subscribe((res:string) => { this.setAttachmentValue(res) })
    } else {
      this.setAttachmentValue('')
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
