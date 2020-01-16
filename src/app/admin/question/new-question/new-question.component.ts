import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IAnswer } from '../question';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) { }

  newQuestionForm = new FormGroup({
    question_text: new FormControl(''),
    level: new FormControl('1'),
    attachment: new FormControl(''),
    type: new FormControl('1'),
  }, {validators: this.questionTaskAdded()});

  attachmentTouched: boolean = false;
  questionType: number = 1;
  answers: IAnswer[] = [];
  testId: number;

  get questionText() {
    return this.newQuestionForm.get('question_text');
  }

  get questionAttachment() {
    return this.newQuestionForm.get('attachment');
  }

  questionTaskAdded(): ValidatorFn  {
    return (control: FormGroup) => {
      let invalid = control.get('question_text').value === '' && control.get('attachment').value === ''
      return invalid ? {'noTask': true} : null;
    }
  }

  deleteAnswer(id: number): void {
    this.answers = this.answers.filter(answer => {
      return answer.answer_id !== id
    })
  }

  addAnswer(questionType = false): void {

    if (questionType) {
      this.answers = [];
      for (let i=1; i<=2; i++) {
        this.answers.push({
          answer_id: i,
          answer_text: '',
          true_answer: 1,
          attachment: '',
          error: ''
        })
      }
      return;
    }
    let trueAnswer: number;
    trueAnswer = (this.questionType === 3) ? 1 : 0;
    if (!this.answers.length) {
      this.answers.push({
        answer_id: 1,
        answer_text: '',
        true_answer: trueAnswer,
        attachment: '',
        error: ''
      })
    } else {
      let id;
      id = this.answers.reduce((maxId, val) => {
         return (val.answer_id > maxId) ? val.answer_id  : maxId
      }, 0)
      this.answers.push({
        answer_id: id + 1,
        answer_text: '',
        true_answer: trueAnswer,
        attachment: '',
        error: ''
      })
    }
  }

  saveAnswerValue(val: IAnswer): void {
    this.answers = this.answers
      .map((answer) => {
        if (answer.answer_id === val.answer_id) {
          return val
        }
        else {
          return (val.true_answer == 1 && this.questionType === 1) ? { ...answer, true_answer: 0 } : answer
        }
      })
  }


  changeQuestionTypeHandler(type: number): void {
    if (this.questionType === 4 || this.questionType === 3 || type === 3 || type === 4) {
      this.answers = [];
    }
    if (this.questionType === 2 && type === 1) {
      let trueAnswersAny = false;
      this.answers.forEach((answer) => {
        if (+answer.true_answer === 1 && !trueAnswersAny) {
          trueAnswersAny = true;
        } else {
          answer.true_answer = 0;
        }
      })
    }
    this.questionType = type;
    if (type === 4) {
      this.addAnswer(true);
    }
  }

  createQuestion() {
    const questionData = {
      ...this.newQuestionForm.value,
      test_id: this.testId,
      attachment: ''
    }
    this.questionService.addNewQuestion(questionData)
      .pipe(switchMap((res:{question_id:number}[]): any => { //FIX
        if (this.answers.length) {
          this.questionService.addAnswerCollection(this.answers, res[0].question_id)
        } else {
          of()
        }
      }))
      .subscribe(() => this.router.navigate([`admin/exams/${this.testId}/questions`]))
  }

  attachmentUploadHandler(e): void {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.questionService.toBase64(file)
        .subscribe((res:string) => { this.setAttachmentValue(res) })
    } else { return }
  }
  
  removeImage(): void {
    this.setAttachmentValue('');
  }

  private setAttachmentValue(value: string): void {
    this.newQuestionForm.get('attachment').setValue(value)
    this.attachmentTouched = true;
  }

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
    this.newQuestionForm.get('type').valueChanges
      .subscribe((value: string) => this.changeQuestionTypeHandler(+value));
  }
}
