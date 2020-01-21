import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './questions.service';
import { IQuestion } from './questions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { switchMap } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../shared/services/modal.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [
    trigger('answersExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('rotateIcon', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
})
export class QuestionComponent implements OnInit {

  questions: IQuestion[];
  dataSource: any;
  expandedQuestion: IQuestion;
  testId: number;
  loadingQuestionId: number;
  loadingQuestions: boolean = false;
  questionsCount: number;
  pageSize:number = 10;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private modalService: ModalService
  ) { }


  @ViewChild("table", { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private getQuestionById(id: number): IQuestion {
    return this.questions.find((question) => {
      return question.question_id === id
    })
  }

  log(data) {
    // this.pageSize = data.pageSize;
    // this.currentPage = data.pageIndex;
    let offset = data.pageIndex * data.pageSize;
    console.log(offset);
    this.getQuestions(offset);
  }

  expandQuestionAnswers(id: number): void {
    let selectedQuestion: IQuestion;
    selectedQuestion = this.getQuestionById(id);
    if (selectedQuestion.answers.length) {
      this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
      return
    }
    else {
      this.loadingQuestionId = id;
      this.questionService.getQuestionAnswers(id)
      .subscribe((res: any) => { //FIX
        if (res.response === 'no records') {
          selectedQuestion.answers = 'No answers';
        } else {
          selectedQuestion.answers = res;
        }
        this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
        this.loadingQuestionId = null;
      })
    }
  }

  deleteQuestion(id:number): void {
    const message = 'Питання та всі відповіді до нього будуть видалені';
    this.modalService.openConfirmModal(message, ()=> {
      this.loadingQuestions = true;
      this.questionService.getQuestionAnswers(id)
        .pipe(
          switchMap((val: any) => { //FIX
            return val.response !== 'no records' ? this.questionService.deleteAnswerCollection(val) : of(val)
          }),
          switchMap(() => this.questionService.deleteQuestion(id))          
        )
        .subscribe( () => { 
            let questionIndex;
            this.questions.forEach( (question, index) => {
              if (question.question_id === id) {
                questionIndex = index;
              }
            })
            this.questions.splice(questionIndex, 1);
            this.loadingQuestions = false;
            // this.table.renderRows();
        })
    });
  }

  getQuestions(offset = 0) {
    this.questionService.getTestQuestions(this.testId, this.pageSize, offset)
    .subscribe((res: IQuestion[]) => {
      const questionsWithEmptyAnswers = res.map((question) => {
        return { ...question, answers: [] }
      }) 
      this.questions = questionsWithEmptyAnswers
      this.dataSource = new MatTableDataSource(questionsWithEmptyAnswers);
      } )
  }

  
  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
    this.loadingQuestions = true;
    this.getQuestions();
    this.questionService.getTestQuestionsCount(this.testId)
        .subscribe( res =>  this.questionsCount = res );
  }

}
