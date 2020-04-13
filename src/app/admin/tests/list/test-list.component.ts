import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Subject } from '../../entity.interface';
import { Test } from 'src/app/shared/entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TestAddComponent } from '../add/test-add.component';
import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportService } from '../../../shared/services/export.service';
import { ExportImportComponent } from '../export-import/export-import.component';

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
    private exportService: ExportService,
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
      if (error.error.response.includes('Error when update')) {
        this.modalService.openErrorModal('Дані не оновлювалися');
      } else {
        this.modalService.openErrorModal('Помилка оновлення!');
      }
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

  /** Create modal window for checked levelsfoe export test */
  createSelectLevelTestModal(test_id: number, level: number[]): void {
    const dialogRef = this.dialog.open(ExportImportComponent, {
      width: '500px',
      data: {
        level,
        test_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exportService.loadQuestionsByTest(result.test_id, result.level);
      }
    });
  }
  openModal(test_id: number) {
    this.exportService.getLevelsByTest(test_id).subscribe((listLevels) => {
      //if (listLevels) {
        this.createSelectLevelTestModal(test_id, listLevels);
      //} else {
      //  this.modalService.openErrorModal('В даному тесті відсутні запитання');
      //}
    });
  }
}
