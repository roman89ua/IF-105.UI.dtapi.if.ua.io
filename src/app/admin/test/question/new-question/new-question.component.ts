import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { switchMap } from 'rxjs/operators';
 

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
    level: new FormControl(''),
    type: new FormControl(''),
  });

  answers: {id: number, answer_text: string, true_answer: number, attachment: string}[] = [];
  testId: number;

  addAnswer() {
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
    console.log(val, 826)
    this.answers = this.answers
      .map((answer) => {
        if (answer.id === val.id) {
          return val
        }
        else {
          return answer
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

  createQuestion() {
    const questionData = {
      ...this.newQuestionForm.value,
      test_id: this.testId,
      attachment: ''
    }
    this.questionService.addNewQuestion(questionData)
      .pipe(switchMap((res:{question_id:number}[]) => this.questionService.addAnswerCollection(this.answers, res[0].question_id)))
      .subscribe(() => console.log('Question was created successfuly'))
  }

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
  }

}
