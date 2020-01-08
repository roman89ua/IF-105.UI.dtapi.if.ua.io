import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { questionService, QuestionService } from '../question.service';
 

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  newQuestionForm = new FormGroup({
    question_text: new FormControl(''),
    level: new FormControl(''),
    type: new FormControl(''),
  });

  newQuestionData: {};

  testId: number;

  // questionData: {
  //   question_text: string,
  //   level: number,
  //   type: number,
  //   test_id: number,
  //   attachment: string
  // }

  log() {
    console.log({...this.newQuestionForm.value, test_id: this.testId, attachment: ''});
  }

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  createQuestion() {
    const questionData = {
      ...this.newQuestionForm.value,
      test_id: this.testId,
      attachment: ''
    }
    this.questionService.addNewQuestion(questionData)
      .subscribe(() => console.log('Question was created successfuly'))
  }

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
  }

}
