import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { IQuestion } from './question';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { switchMap, filter } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('answersExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionComponent implements OnInit {

  questions: IQuestion[]
  expandedQuestion: IQuestion
  testId: number;
  answersLoading: boolean = false;
  expandedQuestionId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }


  @ViewChild("table", { static: true }) table: MatTable<any>;

  private getQuestionById(id) {
    return this.questions.find((question) => {
      return question.question_id === id
    })
  }

  expandQuestionAnswers(id) {
    let selectedQuestion: IQuestion;
    selectedQuestion = this.getQuestionById(id);
    if (selectedQuestion.answers.length) {
      this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
      return
    }
    else {
      this.answersLoading = true;
      this.expandedQuestionId = id;
      this.questionService.getQuestionAnswers(id)
      .subscribe((res: any) => { //FIX
        if (res.response === 'no records') {
          selectedQuestion.answers = 'No answers were added to this question';
        } else {
          selectedQuestion.answers = res;
        }
        this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
        this.answersLoading = false;
      })
    }
  }

  deleteQuestion(id) {

    this.questionService.getQuestionAnswers(id)
      .pipe(switchMap((val: any) => {   //FIX
        if (val.response !== 'no records') {
          
          if (confirm('Видаливши це питання ви видалите всі відповіді до нього')) {
            return this.questionService.deleteAnswerCollection(val)
          }
          else {
            return of('break');
          }
        }
        else {
          // console.log('Видаливши це питання ви видалите всі відповіді до нього');
          return of(val)
        }
      } ), filter(val => val !== 'break'))
      .subscribe(res =>  this.questionService.deleteQuestion(id) 
        .subscribe( res => { 
          let questionIndex;
          this.questions.forEach( (question, index) => {
            if (question.question_id === id) {
              questionIndex = index;
            }
          })
          this.questions.splice(questionIndex, 1);
          this.table.renderRows();
        })
      )

  }

  
  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');

    this.questionService.getTestQuestion(this.testId)
      .subscribe((res: IQuestion[]) => {
        const questionsWithEmptyAnswers = res.map((question) => {
          return { ...question, answers: [] }
        }) 
        this.questions = questionsWithEmptyAnswers
        } )
  }

}
