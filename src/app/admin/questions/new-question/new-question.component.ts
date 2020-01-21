import { Component, OnInit } from '@angular/core';
import { FormGroup,
         FormControl,
         FormBuilder,
         Validators,
         ValidatorFn,
         FormArray
       } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IAnswer } from '../questions';
import { ModalService } from '../../../shared/services/modal.service';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }]
})
export class NewQuestionComponent implements OnInit {

  newQuestionForm: any;
  attachmentTouched: boolean = false;
  questionType: number = 1;
  answers: IAnswer[] = [];
  testId: number;
  private onlyInputTypes: number[] = [3,4];
  private onlyChoiceTypes: number[] = [1,2];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.newQuestionForm = this.fb.group({
      question_text: ['', Validators.required],
      level: ['1'],
      type: ['1'],
      attachment: [''],
      answers: this.fb.array([])
    }, { 
      validators: [this.compareMinMax()]
    });
  }

  get type() {
    return this.newQuestionForm.get('type');
  }

  get level() {
    return this.newQuestionForm.get('level');
  }

  get questionText() {
    return this.newQuestionForm.get('question_text');
  }
  
  get questionAnswers() {
    return this.newQuestionForm.get('answers') as FormArray;
  } 

  get questionAttachment() {
    return this.newQuestionForm.get('attachment');
  }

  compareMinMax(): ValidatorFn {
    return (control: FormGroup) => {
      let invalid = false;
      if (control.controls.answers.value.length === 2) {
        
        //.controls won't work here, throws TS error
        const firstAnswer = this.questionAnswers.controls[0]['controls'].answer_text;
        const secondAnswer = this.questionAnswers.controls[1]['controls'].answer_text;

        if (+this.type.value === 4 &&
          +firstAnswer.value >= +secondAnswer.value &&
          firstAnswer.value !== '' &&
          secondAnswer.value !== '' 
         ) {
            firstAnswer.status = 'INVALID'
            secondAnswer.status = 'INVALID'
            invalid = true
        } else if (
          firstAnswer.errors === null &&
          secondAnswer.errors === null 
        ) {
            firstAnswer.status = 'VALID'
            secondAnswer.status = 'VALID'
        }
      }
      return invalid ? {'numberTypeInvalid': true} : null;
    }
  }

  
  checkTrueAnswersQuantity(answerIndex) {
    if (+this.type.value === 1) {
        this.questionAnswers.value.forEach((_, index) => {
          if (index !== answerIndex) {
            this.questionAnswers.controls[index].get('true_answer').setValue(false); 
          } else {
            this.questionAnswers.controls[answerIndex].get('true_answer').setValue(true);
          }
        });
      }
  }

  answerByIndex(index) {
    return this.questionAnswers.value[index] as FormControl;
  }

  trueAnswer(index) {
    return this.questionAnswers.value[index].true_answer
  }

  addAnswer() {
    if (+this.type.value === 4) {
      for (let i=0; i<2; i++) {
        this.questionAnswers.push(this.fb.group({
          answer_text: ['', [Validators.required]],
          true_answer: [true],
          attachment: ['']
        }))
      }
      return;
    } else if (+this.type.value === 3) {
      this.questionAnswers.push(this.fb.group({
        answer_text: ['', Validators.required],
        true_answer: [true],
        attachment: ['']
      }))
    } else {
      this.questionAnswers.push(this.fb.group({
        answer_text: ['', Validators.required],
        true_answer: [false],
        attachment: ['']
      }))
    }
  }

  deleteAnswer(index: number): void {
    this.questionAnswers.removeAt(index)
  }

  changeQuestionTypeHandler(): void {
    if (+this.questionType === +this.type.value) {
      return;
    }
    if ( this.onlyInputTypes.includes(+this.questionType) || this.onlyInputTypes.includes(+this.type.value) ) {
      while (this.questionAnswers.length !== 0) {
        this.questionAnswers.removeAt(0)
      }
    }
    if ( this.onlyChoiceTypes.includes(+this.questionType) || this.onlyChoiceTypes.includes(+this.type.value) ) {
      this.questionAnswers.value.forEach((_, index) => {
        this.questionAnswers.value[index].true_answer = false; 
      });
    }
    if (+this.type.value === 4) {
      this.addAnswer();
    }
    this.questionType = this.type.value;
  }

  createQuestion() {
    if (!this.questionAnswers.value.length) {
      this.modalService.openAlertModal('Питання не має жодної відповіді, додайте відповіді щоб продовжити','Помилка','error');
      return;
    }
    if (this.questionAnswers.value.every((answer) => !answer.true_answer)) {
      this.modalService.openAlertModal('Питання не має правильної відповіді','Помилка','error');
      return;
    }
    const questionData = {
      type: this.type.value,
      test_id: this.testId,
      question_text: this.questionText.value,
      level: this.level.value,
      attachment: this.questionAttachment.value,
    }
    this.questionService.addNewQuestion(questionData)
      .pipe(switchMap((res:{question_id:number}[]): any => { //FIX
        if (this.questionAnswers.value.length) {
          return this.questionService.addAnswerCollection(this.questionAnswers.value, res[0].question_id)
        } else {
          debugger;
          return of(null)
        }
      }))
      .subscribe(() => this.router.navigate([`admin/exams/${this.testId}/questions`]))
  }


  //ATTACHMENT
  attachmentUploadHandler(e): void {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.questionService.toBase64(file)
        .subscribe((res:string) => { this.setAttachmentValue(res) })
    }
  }

  aswerAttachmentUploadHandler(e, index) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.questionService.toBase64(file)
        .subscribe((res:string) => { this.questionAnswers.controls[index].get('attachment').setValue(res) })
    }
  }
  
  removeImage(): void {
    this.setAttachmentValue('');
    // REVIEW
    const fileUploadElement: any = document.getElementById('file-input-question'); 
    fileUploadElement.value = '';
  }

  private setAttachmentValue(value: string): void {
    this.newQuestionForm.get('attachment').setValue(value)
  }
  
  removeAnswerImage(index) {
    this.questionAnswers.controls[index].get('attachment').setValue('');
    // REVIEW
    const fileUploadElement: any = document.getElementById(`file-input-${index}`); 
    fileUploadElement.value = '';
  }

  

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
    this.newQuestionForm.get('type').valueChanges
      .subscribe((value: string) => this.changeQuestionTypeHandler());
  }
}
