import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
 

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  newQuestionForm = new FormGroup({
    question_text: new FormControl(''),
    level: new FormControl('1'),
    type: new FormControl('1'),
  });

  questionType: number = 1;

  answers: {id: number, answer_text: string, true_answer: number, attachment: string}[] = [];
  testId: number;

  addAnswer(questionType = null) {

    if (questionType) {
      console.log(questionType, '[ADD ANSWER]')
      this.answers = [];
      for (let i=1; i<=2; i++) {
        this.answers.push({id: i, answer_text: '', true_answer: 1, attachment: ''})
      }
      return;
    }

    if (!this.answers.length) {
      this.answers.push({id: 1, answer_text: '', true_answer: 0, attachment: ''})
    } else {
      let id;
      id = this.answers.reduce((maxId, val) => {
         return (val.id > maxId) ? val.id  : maxId
      }, 0)
      this.answers.push({id: id + 1, answer_text: '', true_answer: 0, attachment: ''})
    }
  }

  saveAnswerValue(val) {

    this.answers = this.answers
      .map((answer) => {
        if (answer.id === val.id) {
          return val
        }
        else {
          return (val.true_answer == 1 && this.questionType === 1) ? { ...answer, true_answer: 0 } : answer
        }
      })
  }

  // saveAnswers() {
  //   this.questionService.addAnswerCollection(this.answers)
  //     .subscribe(a=>console.log(a, 'success'))
  // }

  log() {
    console.log({...this.newQuestionForm.value, test_id: this.testId, attachment: ''});
  }

    // answers: {id: number}[];

  // questionData: {
  //   question_text: string,
  //   level: number,
  //   type: number,
  //   test_id: number,
  //   attachment: string
  // }

  changeQuestionTypeHandler(type) {
    console.log(this.questionType, '[Question type old]')
    if (this.questionType === 4 || this.questionType === 3) {
      this.answers = [];
    }
    this.questionType = type;
    if (type === 4) {
      console.log(123123);
      this.addAnswer(1);
    }
    // console.log(type)
    // if (type == 3) {
    //   console.log('input')
    //   this.answers = [];
    //   this.answers.push({})
    // } else if (type == 4) {
    //   console.log('numeral')
    // }

  }

  createQuestion() {
    console.log(this.questionType);
    // const questionData = {
    //   ...this.newQuestionForm.value,
    //   test_id: this.testId,
    //   attachment: ''
    // }
    // this.questionService.addNewQuestion(questionData)
    //   .pipe(switchMap((res:{question_id:number}[]) => this.questionService.addAnswerCollection(this.answers, res[0].question_id)))
    //   .subscribe(() => console.log('Question was created successfuly'))
  }

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
    this.newQuestionForm.get('type').valueChanges.subscribe((value: string) => this.changeQuestionTypeHandler(+value));
  }

}
