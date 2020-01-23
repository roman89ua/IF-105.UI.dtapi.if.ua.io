import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './questions.service';
import { IQuestion } from './questions';
import { switchMap } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../shared/services/modal.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  dataSource;
  questions: any;
  noQuestions: false;
  testId: number;
  loadingQuestions = false;
  questionsCount: number;
  pageSize = 10;
  currentPage: 0;
  testName: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private modalService: ModalService,
    private apiService: ApiService
  ) { }


  @ViewChild('table', { static: true }) table: MatTable<IQuestion>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageChangeHandler(data) {
    this.pageSize = data.pageSize;
    this.currentPage = data.pageIndex;
    const offset = this.pageSize * this.currentPage;
    this.loadingQuestions = true;
    this.getQuestions(offset);
  }

  deleteQuestion(id: number): void {
    const message = 'Питання та всі відповіді до нього будуть видалені';
    this.modalService.openConfirmModal(message, () => {
      this.loadingQuestions = true;
      this.apiService.getEntityByAction('Answer', 'getAnswersByQuestion', id)
        .pipe(
          switchMap((val: any) => { // FIX
            return val.response !== 'no records' ? this.questionService.deleteAnswerCollection(val) : of(val);
          }),
          switchMap(() => this.questionService.deleteQuestion(id)),
        )
        .subscribe(() => {
            const offset = this.pageSize * this.currentPage;
            this.getQuestions(offset);
            this.getQuestionsCount();
            this.loadingQuestions = false;
        });
    });
  }

  getQuestions(offset = 0) {
    this.questionService.getTestQuestions(this.testId, this.pageSize, offset)
    .subscribe((res: IQuestion[]) => {
        this.questions = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.loadingQuestions = false;
    });
  }

  getQuestionsCount() {
    this.questionService.getTestQuestionsCount(this.testId)
      .subscribe(res => { this.questionsCount = res; });
  }

  getTestName() {
    this.apiService.getEntity('test', this.testId)
      .subscribe((res) => { this.testName = res[0].test_name; });
  }

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
    this.getTestName();
    this.loadingQuestions = true;
    this.getQuestionsCount();
    this.getQuestions();
  }

}
