import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Subject } from '../../entity.interface';
import { Test } from '../../entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TestAddComponent } from '../add/test-add.component';
import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
  currentSubjectId: number;
  listTests: Test[] = [];
  listSubjects: Subject[] = [];
  dataSource = new MatTableDataSource<Test>();
  displayedColumns: string[] = [
    'id',
    'name',
    'subject',
    'tasks',
    'action',
  ];

  @ViewChild('table', {static: true}) table: MatTable<Test>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    protected apiService: ApiService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadSubjects();
    this.route.queryParamMap.subscribe((params: any) => {
      this.currentSubjectId = params.params.subject_id;
    });
    this.viewAllTests();
  }

  onChangeSubject(newSubjectId: number) {
    this.listTests = [];
    this.currentSubjectId = newSubjectId;
    this.router.navigate([], {queryParams: {subject_id: this.currentSubjectId}});
    this.viewAllTests();
  }

  public openAddTestDialog(): void {
    const dialogRef = this.dialog.open(TestAddComponent, {
      width: '500px',
      data: {
        data: this.currentSubjectId ? {subject_id: this.currentSubjectId} : {},
        description: {
          title: 'Додати новий тест',
          action: 'Додати'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTest(this.prepareTestData(result));
      }
    });
  }

  private prepareTestData(data: Test): Test {
    if (!data.enabled) {
      data.enabled = '0';
    }
    // data.enabled = Number(data.enabled);
    // data.tasks = Number(data.tasks);
    // data.attempts = data.attempts;
    // data.time_for_test = Number(data.time_for_test);
    // data.test_id = Number(data.test_id);
    // data.subject_id = Number(data.subject_id);

    return data;
  }

  public openDeleteDialog(test: Test) {
    const message = `Підтвердіть видалення теста ${test.test_name}?`;

    this.modalService.openConfirmModal(message, () => this.removeTest(test.test_id));
  }

  public openEditTestDialog(test: Test): void {
    const dialogRef = this.dialog.open(TestAddComponent, {
      width: '500px',
      data: {
        data: test,
        description: {
          title: 'Редагувати інформацію про тест',
          action: 'Зберегти зміни'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editTest(this.prepareTestData(result));
      }
    });
  }

  public getSubjectNameById(subjectId: number): string {
    const subject = this.listSubjects.find(subjectItem => {
      return subjectItem.subject_id === subjectId;
    });

    if (subject) {
      return subject.subject_name;
    }

    return 'Невизначений';
  }

  private addTest(test: Test) {
    this.apiService.createEntity('test', test).subscribe((result: Test[]) => {
      this.listTests.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
  }

  private editTest(test: Test): void {
    this.apiService.updEntity('test', test, test.test_id).subscribe(() => {
      this.dataSource.data = this.listTests;
    }, (error: any) => {
      this.modalService.openErrorModal('Помилка оновлення!');
    });
  }

  private removeTest(id: number) {
    this.apiService.delEntity('test', id)
      .subscribe((response) => {
          this.modalService.openInfoModal('Тест видалено');
          this.viewAllTests();
        },
        err => {
          this.modalService.openErrorModal('Помилка видалення');
        });
  }

  private loadSubjects() {
    this.apiService.getEntity('subject').subscribe((result: Subject[]) => {
      this.listSubjects = result;
    });
  }

  private viewAllTests() {
    let request = this.apiService.getEntity('test');

    if (this.currentSubjectId) {
      request = this.apiService.getTestsBySubject('test', this.currentSubjectId);
    }

    request.subscribe((result: Test[]) => {
      if (result['response'] === 'no records') {
        result = [];
      }

      this.listTests = result;
      this.dataSource.data = this.listTests;
      this.dataSource.paginator = this.paginator;
    });
  }

  public navigateToTestDetail(testId: number) {
    this.router.navigate(['/admin/subjects/tests/test-detail'], { queryParams: { test_id: testId }});
  }
}
