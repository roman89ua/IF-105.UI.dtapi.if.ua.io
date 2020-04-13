import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IAnswer, IQuestion } from '../questions';
import { ModalService } from '../../../shared/services/modal.service';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }] // used for programmatical control on checkbox value
})

export class NewQuestionComponent implements OnInit {

  attachmentTouched = false;
  questionType = 1;
  answers: IAnswer[] = [];
  testId: number;
  attachmentLoadingIndex: number;
  maxAttachmentSize = 16000000;
  private onlyInputTypes = [3, 4];
  private onlyChoiceTypes = [1, 2];
  // EDIT MODE
  questionLoading = false;
  editMode = false;
  questionId: number;
  oldQuestionData: IQuestion;
  oldAnswers: IAnswer[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private apiService: ApiService
  ) { }

  newQuestionForm = this.fb.group({
    question_text: ['', Validators.required],
    level: ['1'],
    type: ['1'],
    attachment: [''],
    answers: this.fb.array([])
  }, {
    validators: [this.compareMinMax()]
  });

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
      if (control.get('answers').value.length === 2 && +this.type.value === 4) {
        // .get('answer_text') doesn't work here because only this way I managed to change formControl status
        const firstAnswer = this.questionAnswers.controls[0]['controls'].answer_text;
        const secondAnswer = this.questionAnswers.controls[1]['controls'].answer_text;
        if (+firstAnswer.value >= +secondAnswer.value && firstAnswer.value !== '' && secondAnswer.value !== '' ) {
            firstAnswer.status = 'INVALID';
            secondAnswer.status = 'INVALID';
            invalid = true;
        } else if ( firstAnswer.errors === null && secondAnswer.errors === null ) {
            firstAnswer.status = 'VALID';
            secondAnswer.status = 'VALID';
        }
      }
      return invalid ? {numberTypeInvalid: true} : null;
    };
  }

  checkTrueAnswers(answerIndex) {
    if (+this.type.value === 1) {
      this.questionAnswers.value.forEach((_, index) => {
          this.questionAnswers.controls[index].get('true_answer').setValue(false);
      });
      this.questionAnswers.controls[answerIndex].get('true_answer').setValue(true);
    } else if (+this.type.value === 2) {
      const checkboxValue = this.questionAnswers.controls[answerIndex].get('true_answer').value;
      this.questionAnswers.controls[answerIndex].get('true_answer').setValue(!checkboxValue);
    }
  }

  trueAnswer(index) {
    return this.questionAnswers.value[index].true_answer;
  }

  addAnswer() {
    if (+this.type.value === 4) {
      for (let i = 0; i < 2; i++) {
        this.questionAnswers.push(this.fb.group({
          answer_text: ['', [Validators.required]],
          true_answer: [true],
          attachment: ['']
        }));
      }
      return;
    } else if (+this.type.value === 3) {
      this.questionAnswers.push(this.fb.group({
        answer_text: ['', Validators.required],
        true_answer: [true],
        attachment: ['']
      }));
    } else {
      this.questionAnswers.push(this.fb.group({
        answer_text: ['', Validators.required],
        true_answer: [false],
        attachment: ['']
      }));
    }
  }

  deleteAnswer(index: number): void {
    this.questionAnswers.removeAt(index);
  }

  changeQuestionTypeHandler(): void {
    if (+this.questionType === +this.type.value) {
      return;
    }
    if ( this.onlyInputTypes.includes(+this.questionType) || this.onlyInputTypes.includes(+this.type.value) ) {
      while (this.questionAnswers.length !== 0) {
        this.questionAnswers.removeAt(0);
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
    if (this.editMode) {
      this.updateQuestion();
      return;
    }
    if (!this.questionAnswers.value.length) {
      this.modalService.openAlertModal('Питання не має жодної відповіді, додайте відповіді щоб продовжити', 'Помилка', 'error');
      return;
    }
    if (this.questionAnswers.value.every((answer) => !answer.true_answer)) {
      this.modalService.openAlertModal('Питання не має правильної відповіді', 'Помилка', 'error');
      return;
    }
    const questionData = {
      type: this.type.value,
      test_id: this.testId,
      question_text: this.questionText.value,
      level: this.level.value,
      attachment: this.questionAttachment.value,
    };

    this.apiService.createEntity('Question', questionData)
      .pipe(switchMap((res: {question_id: number}[]): any => { // FIX
        if (this.questionAnswers.value.length) {
          return this.questionService.addAnswerCollection(this.questionAnswers.value, res[0].question_id);
        } else {
          return of(null);
        }
      }))
      .subscribe(() => this.router.navigate([`admin/subjects/tests/${this.testId}/questions`]));
  }

  updateQuestion() {
    const answers = this.questionAnswers.value.map((answer, index) => {
      return {
        ...answer,
        answer_id: this.oldAnswers[index].answer_id,
      };
    }).filter((answer, index) => {
      return !this.isObjectsEqual(answer, this.oldAnswers[index]);
    });
    const questionData = {
      type: this.type.value,
      test_id: this.testId,
      question_text: this.questionText.value,
      level: this.level.value,
      attachment: this.questionAttachment.value,
      question_id: this.oldQuestionData.question_id
    };
    const answersToUpdate = answers.length ? true : false;
    const questionToUpdate = !this.isObjectsEqual(questionData, this.oldQuestionData);
    if (!answersToUpdate && !questionToUpdate) {
      this.modalService.openAlertModal('Дані не змінювались', 'Помилка', 'error');
      return;
    }
    if (questionToUpdate) {
      this.questionService.updateQuestion(this.questionId, questionData)
      .pipe(
        switchMap(() => {
          if (answers.length) {
            return this.questionService.updateAnswerCollection( answers, this.questionId);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(() => {
        this.modalService.openAlertModal('Питання успішно оновлене', '', 'info');
        this.router.navigate([`admin/subjects/tests/${this.testId}/questions`])
      });
    }
    if (answersToUpdate && !questionToUpdate) {
      this.questionService.updateAnswerCollection( answers, this.questionId)
        .subscribe(() => {
          this.modalService.openAlertModal('Питання успішно оновлене', '', 'info');
          this.router.navigate([`admin/subjects/tests/${this.testId}/questions`])
        });
    }
  }

  attachmentUploadHandler(e, index?): void {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      this.modalService.openAlertModal('Невірний формат', 'Помилка', 'error');
      return;
    }
    if (file.size > this.maxAttachmentSize) {
      this.modalService.openAlertModal(`Максимально допустимий розмір зображення ${this.maxAttachmentSize / 1000000} МБ`, 'Помилка', 'error');
      return;
    }
    const forAnswer = index === undefined;
    // -1 is value for question attachment
    this.attachmentLoadingIndex = forAnswer ?  -1 : index;
    if (file) {
      this.questionService.toBase64(file)
        .subscribe((res: string) => {
          if (forAnswer) {
            this.setAttachmentValue(res);
          } else {
            this.questionAnswers.controls[index].get('attachment').setValue(res);
          }
          this.attachmentLoadingIndex = null;
        });
    }
  }
  removeImage(): void {
    this.setAttachmentValue('');
    const fileUploadElement: any = document.getElementById('file-input-question');
    fileUploadElement.value = '';
  }

  private setAttachmentValue(value: string): void {
    this.newQuestionForm.get('attachment').setValue(value);
  }

  removeAnswerImage(index) {
    this.questionAnswers.controls[index].get('attachment').setValue('');
    const fileUploadElement: any = document.getElementById(`file-input-${index}`);
    fileUploadElement.value = '';
  }

  private isObjectsEqual(obj1, obj2) {
    for (let key in obj1) {
      if (obj1[key] != obj2[key]) {
        return false;
      }
    }
    return true;
  }

  setFormValue() {
    this.questionLoading = true;
    this.questionService.getQuestion(this.questionId)
    .pipe(
      switchMap((res) => {
        this.oldQuestionData = res[0];
        return this.questionService.getQuestionAnswers(this.questionId);
      }),
      map((res: any) => { // FIX
        if (res.response === 'no records') {
          return [];
        }
        const answerData = res.map((answer: IAnswer)  => {
          answer.true_answer = +answer.true_answer ? true : false;
          delete answer.question_id;
          return answer;
        });
        return answerData;
      })).subscribe(res => {
        this.questionText.setValue(this.oldQuestionData.question_text);
        this.level.setValue(this.oldQuestionData.level);
        this.type.setValue(this.oldQuestionData.type);
        this.type.disable();
        this.questionAttachment.setValue(this.oldQuestionData.attachment);
        this.oldAnswers = res;
        res.forEach((answer) => {
          this.questionAnswers.push(this.fb.group({
            answer_text: [answer.answer_text, [Validators.required]],
            true_answer: [answer.true_answer],
            attachment: [answer.attachment]
          }));
        });
        this.questionLoading = false;
      });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('mode') === 'edit') {
      this.editMode = true;
      this.questionId = +this.route.snapshot.paramMap.get('questionId');
      this.setFormValue();
    }
    this.testId = +this.route.snapshot.paramMap.get('id');
    if (!this.editMode) {
      this.newQuestionForm.get('type').valueChanges
      .subscribe((res: string) => this.changeQuestionTypeHandler());
    }
  }
}
