import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { IQuestion } from './question';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionComponent implements OnInit {

  questions: IQuestion[]

  expandedQuestion: IQuestion

  constructor(private questionService: QuestionService) { }

  log() {
    console.log(23)
  }

  expandQuestionAnswers(id, question) {

    let selectedQuestion: IQuestion;
    selectedQuestion = this.questions.find((question) => {
      return question.question_id === id
    })
    this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
    
    if (selectedQuestion.answers.length) {
      return
    }
    else {
      this.questionService.getQuestionAnswers(id)
      .subscribe((res) => {
        selectedQuestion.answers = res;
      })
    }

    
  }

  showAnswers(id) {
    this.questionService.getQuestionAnswers(id)
      .subscribe((res) => {
        let selectedQuestion: IQuestion;
        selectedQuestion = this.questions.find((question) => {
          return question.question_id === id
        })
        selectedQuestion.answers = res;
      })
  }
  
  ngOnInit() {
    this.questionService.getTestQuestion()
      .subscribe((res: IQuestion[]) => {
        const questionsWithEmptyAnswers = res.map((question) => {
          return { ...question, answers: [] }
        }) 
        this.questions = questionsWithEmptyAnswers
        } )
  }

}
