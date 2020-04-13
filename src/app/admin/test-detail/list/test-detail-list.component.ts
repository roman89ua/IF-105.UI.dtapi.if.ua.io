import {Component, OnInit, ViewChild} from '@angular/core';
import { Test } from 'src/app/shared/entity.interface';
import { TestDetail } from 'src/app/shared/entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDetailAddComponent } from '../add/test-detail-add.component';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail-list.component.html',
  styleUrls: ['./test-detail-list.component.scss'],
})

export class TestDetailListComponent implements OnInit {
  currentTestId: number;
  currentTest: Test;
  listTests: Test[];
  listCurrentSubjectTests: Test[];
  listTestsDetails: TestDetail[] = [];
  listTestsDetailsRatesSum: number;
  dataSource = new MatTableDataSource<TestDetail>();
  displayedColumns: string[] = [
    'id',
    'level',
    'tasks',
    'rate',
    'action',
  ];

  @ViewChild('table', {static: true}) table: MatTable<TestDetail>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    protected apiService: ApiService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.currentTestId = params.params.test_id;
    });

    this.initialize();
  }

  onChangeTest(newTestId: number) {
    this.currentTestId = newTestId;
    this.router.navigate([], {queryParams: {test_id: this.currentTestId}});
    this.setCurrentTest();
    this.loadCurrentSubjectTestsList();
    this.viewTestDetailsByTest();
  }

  private setCurrentTest() {
    this.currentTest = this.listTests.find(testItem => {
      return testItem.test_id === this.currentTestId;
    });
  }

  private loadCurrentSubjectTestsList(): void {
    if (this.currentTest && this.currentTest.subject_id) {
      this.apiService.getTestsBySubject('test', this.currentTest.subject_id)
        .subscribe((result: Test[]) => {
          if (result['response'] === 'no records') {
            result = [];
          }

          this.listCurrentSubjectTests = result;
        });
    } else {
      this.listCurrentSubjectTests = this.listTests;
    }
  }

  private initialize(): void {
    this.apiService.getEntity('test')
      .subscribe((result: Test[]) => {
        if (result['response'] === 'no records') {
          result = [];
        }

        this.listTests = result;
        this.setCurrentTest();
        this.loadCurrentSubjectTestsList();
        this.viewTestDetailsByTest();
      });
  }

  public openDeleteDialog(testDetail: TestDetail) {
    const message = `Підтвердіть видалення налаштувань!`;

    this.modalService.openConfirmModal(message, () => this.removeTestDetail(testDetail.id));
  }

  private removeTestDetail(id: number) {
    this.apiService.delEntity('TestDetail', id)
      .subscribe((response) => {
          this.modalService.openInfoModal('Налаштування теста видалено!');
          this.viewTestDetailsByTest();
        },
        err => {
          this.modalService.openErrorModal('Помилка видалення!');
        });
  }

  public openAddTestDetailsDialog() {
    const dialogRef = this.dialog.open(TestDetailAddComponent, {
      width: '500px',
      data: {
        data: {
          test_id: this.currentTest ? this.currentTest.test_id : null,
        },
        description: {
          title: 'Додати нові налаштування теста',
          action: 'Додати'
        },
        usedLevels: this.getUsedLevelsFromTestDetails(),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTestDetail(this.prepareTestDetailData(result));
      }
    });
  }

  public openEditTestDetailDialog(testDetail: TestDetail): void {
    const dialogRef = this.dialog.open(TestDetailAddComponent, {
      width: '500px',
      data: {
        data: testDetail,
        description: {
          title: 'Редагувати налаштування теста',
          action: 'Зберегти зміни'
        },
        usedLevels: this.getUsedLevelsFromTestDetails(),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editTest(this.prepareTestDetailData(result));
      }
    });
  }

  private prepareTestDetailData(data): TestDetail {
    data.level = Number(data.level);
    data.tasks = Number(data.tasks);
    data.rate = Number(data.rate);

    return data;
  }

  private addTestDetail(testDetail: TestDetail) {
    this.apiService.createEntity('TestDetail', testDetail).subscribe((result: TestDetail[]) => {
      this.listTestsDetails.push(result[0]);
      this.dataSource.data = this.listTestsDetails;
      this.listTestsDetailsRatesSum = this.getRatesSumForCurrentTest();
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
  }

  private editTest(testDetail: TestDetail): void {
    this.apiService.updEntity('TestDetail', testDetail, testDetail.id).subscribe(() => {
      this.dataSource.data = this.listTestsDetails;
      this.listTestsDetailsRatesSum = this.getRatesSumForCurrentTest();
    }, (error: any) => {
      if (error.error.response.includes('Error when update')) {
        this.modalService.openErrorModal('Дані не оновлювалися');
      } else {
        this.modalService.openErrorModal('Помилка оновлення!');
      }
    });
  }

  private getRatesSumForCurrentTest(): number {
    if (!this.listTestsDetails) {
      return 0;
    }

    return this.listTestsDetails.reduce((sum: number, testDetail: TestDetail) => {
      return sum + (testDetail.tasks * testDetail.rate);
    }, 0);
  }

  private viewTestDetailsByTest() {
    this.apiService.getTestDetailsByTest('TestDetail', this.currentTest.test_id).subscribe((result: TestDetail[]) => {
      if (result['response'] === 'no records') {
        result = [];
      }

      this.listTestsDetails = result;
      this.listTestsDetailsRatesSum = this.getRatesSumForCurrentTest();
      this.dataSource.data = this.listTestsDetails;
      this.dataSource.paginator = this.paginator;
    });

  }

  private getUsedLevelsFromTestDetails(): number[] {
    return this.listTestsDetails.map(testDetail => Number(testDetail.level));
  }
}
