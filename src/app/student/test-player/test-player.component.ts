import { Component, OnInit } from '@angular/core';
import { TestPlayerService } from '../test-player.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-test-player',
  templateUrl: './test-player.component.html',
  styleUrls: ['./test-player.component.scss']
})
export class TestPlayerComponent implements OnInit {
  public questions: { "question_id": string; "test_id": string; "question_text": string; "level": string; "type": string; "attachment": string; }[];
  public index: number;
  public choosenQuestionId: string;
  public addedQuestionAnswer: any = [];
  public markedQuestions: any = [];
  public isTestDone = false;
  public testResults: Object;
  constructor( private testPlayerService: TestPlayerService, private route: ActivatedRoute) {
    this.questions = [];
  }

  get choosenQuestion() {
    return this.questions.find(({question_id}) => {
      return this.choosenQuestionId === question_id;
    }) || this.questions[0];
  }

  get choosenAnswer() {
    return this.addedQuestionAnswer.find(({question}) => {
      return this.choosenQuestionId === question;
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          const testId = paramMap.get('id');
          return this.testPlayerService.getQuestionList(+testId);
        })
      )      
      .subscribe(questions => {
        this.questions = questions;
      })
      
  }
  viewQuestionParent(id: string) {
    this.choosenQuestionId = id;
  }
  addQuestionAnswer(res: any) { 
    this.addedQuestionAnswer = [...this.addedQuestionAnswer.filter((item: any) => {
      return item.question !== res.question}), res]   
  }

  addMarkedQuestion(id: number) {
    if(this.markedQuestions.includes(id)) {
      this.markedQuestions = this.markedQuestions.filter(markedQuestion => {
        return markedQuestion !== id
      })
      return;
    }
    this.markedQuestions = [...this.markedQuestions, id];

  }

  sendAnswersForCheck() {
    const testDataForCheck  = this.addedQuestionAnswer.map(item => {
      if (typeof item.answer === "string" || typeof item.answer === "number") {
        return { question_id: item.question, answer_ids: [item.answer] }
      }
      return { question_id: item.question, answer_ids: item.answer }
    })

    return this.testPlayerService.checkTest(testDataForCheck)
      .subscribe((results) => {
        this.testResults = results;
        this.isTestDone = true;
      })
  }
}


