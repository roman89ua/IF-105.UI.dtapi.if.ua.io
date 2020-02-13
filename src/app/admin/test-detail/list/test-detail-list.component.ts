import {Component, OnInit, ViewChild} from '@angular/core';
import { Test} from '../../entity.interface';
import { TestDetail } from '../../entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TestDetailAddComponent} from '../add/test-detail-add.component';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail-list.component.html',
  styleUrls: ['./test-detail-list.component.scss'],
})

export class TestDetailListComponent implements OnInit {
  currentTestId: number;
  listTestsDetails: TestDetail[] = [];
  listTest: Test[] = [];
  listTestsDetailsRatesSum: number;
  dataSource = new MatTableDataSource<TestDetail>();
  displayedColumns: string[] = [
    'id',
    'level',
    'tasks',
    'rate',
    'action',
  ];

  @ViewChild('table', { static: true }) table: MatTable<TestDetail>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    protected apiService: ApiService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTestsList();
    this.route.queryParamMap.subscribe((params: any) => {
      this.currentTestId = params.params.test_id;
    });
    this.viewTestDetailsByTest();
  }

  onChangeTest(newTestId: number) {
    this.currentTestId = newTestId;
    this.router.navigate([], { queryParams: {test_id: this.currentTestId} });
    this.viewTestDetailsByTest();
  }

  private loadTestsList() {
    this.apiService.getEntity('test').subscribe((result: Test[]) => {
      this.listTest = result;
    });
  }

  public openDeleteDialog(testDetail: TestDetail) {
    const message = `Підтвердіть видалення налаштувань!`;

    this.modalService.openConfirmModal(message, () => this.removeTestDetail(testDetail.id));
  }

  private removeTestDetail(id: number) {
    this.apiService.delEntity('TestDetail', id)
      .subscribe((response) => {
          this.modalService.openInfoModal('Налаштування тесту видалено');
          this.viewTestDetailsByTest();
        },
        err => {
          this.modalService.openErrorModal('Помилка видалення');
        });
  }

  public openAddTestDetailsDialog() {
    const dialogRef = this.dialog.open(TestDetailAddComponent, {
      width: '500px',
      data: {
        data: {
          test_id: this.currentTestId
        },
        description: {
          title: 'Додати нові налаштування тесту',
          action: 'Додати'
        }
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
          title: 'Редагувати інформацію про налаштування тесту',
          action: 'Зберегти зміни'
        }
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
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
  }

  private editTest(testDetail: TestDetail): void {
    this.apiService.updEntity('TestDetail', testDetail, testDetail.id).subscribe(() => {
      this.dataSource.data = this.listTestsDetails;
    }, (error: any) => {
      this.modalService.openErrorModal('Дані з таким рівнем вже існують');
    });
  }

  private getRatesSumForCurrentTest(): number {
    if (!this.listTestsDetails.length) {
      return 0;
    }

    return this.listTestsDetails.reduce((sum: number, testDetail: TestDetail) => {
      return sum + (testDetail.tasks * testDetail.rate);
    }, 0);
  }

  public getTestNameById(testId: number): string {
    const test = this.listTest.find(testItem => {
      return testItem.test_id === testId;
    });

    if (test) {
      return test.test_name;
    }
    return 'Невизначений';
  }

  private viewTestDetailsByTest() {
    this.apiService.getTestDetailsByTest('TestDetail', this.currentTestId).subscribe((result: TestDetail[]) => {
      this.listTestsDetails = result;
      this.listTestsDetailsRatesSum = this.getRatesSumForCurrentTest();
      return this.dataSource.data = this.listTestsDetails;
    });
  }
}
