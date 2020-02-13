import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestPlayerService} from '../test-player.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ModalService} from '../../shared/services/modal.service';

@Component({
  selector: 'app-test-player',
  templateUrl: './test-player.component.html',
  styleUrls: ['./test-player.component.scss']
})
export class TestPlayerComponent implements OnInit, OnDestroy {
  public questions: { 'question_id': string; 'test_id': string; 'question_text': string; 'level': string; 'type': string; 'attachment': string; }[];
  public index: number;
  public choosenQuestionId: string;
  public addedQuestionAnswer: any = [];
  public markedQuestions: any = [];
  public isTestDone = false;
  public testResults: any;
  timeForTest: number;
  timer: number;
  userTime: number;
  serverTime: number;
  testInProgress;

  constructor(private testPlayerService: TestPlayerService,
              private route: ActivatedRoute,
              private modalService: ModalService) {
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
    this.route.queryParamMap.subscribe((params: any) => {
      const testId = params.params.test_id;
      this.timeForTest = Number(params.params.time_for_test) * 60;
      this.timer = Number(params.params.time_for_test) * 60;
      this.userTime = Math.floor(Date.now() / 1000) + 7200;
      
      return this.testPlayerService.getQuestionList(+testId)
        .subscribe(questions => {
          this.questions = questions;
        });
    });
    this.testInProgress = setInterval(() => {
      this.synchronizeTime();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.testInProgress);
  }

  viewQuestionParent(id: string) {
    this.choosenQuestionId = id;
  }

  addQuestionAnswer(res: any) {
    this.addedQuestionAnswer = [...this.addedQuestionAnswer.filter((item: any) => {
      return item.question !== res.question;
    }), res];
  }

  addMarkedQuestion(id: number) {
    if (this.markedQuestions.includes(id)) {
      this.markedQuestions = this.markedQuestions.filter(markedQuestion => {
        return markedQuestion !== id;
      });
      return;
    }
    this.markedQuestions = [...this.markedQuestions, id];

  }

  sendAnswersForCheck() {
    const testDataForCheck = this.addedQuestionAnswer.map(item => {
      if (typeof item.answer === 'string' || typeof item.answer === 'number') {
        return {question_id: item.question, answer_ids: [item.answer]};
      }
      return {question_id: item.question, answer_ids: item.answer};
    });

    return this.testPlayerService.checkTest(testDataForCheck)
      .subscribe((results) => {
        this.testResults = results;
        this.isTestDone = true;
      });
  }

  synchronizeTime() {
        this.testPlayerService.getTime().subscribe((data: any) => {
          this.serverTime = data.curtime;
          console.log('synchronized');
          this.timer = this.timeForTest - (this.serverTime - this.userTime);
        });
    }

  finish(event) {
    if (event.action === 'done') {
      this.sendAnswersForCheck();
      this.modalService.openInfoModal('Час вийшов');
    }
  }
}
