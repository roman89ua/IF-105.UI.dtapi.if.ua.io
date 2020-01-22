import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Test } from '../../entity.interface';
import { Subject } from '../../entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TestAddComponent } from '../add/test-add.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-group',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
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

  @ViewChild('table', { static: true }) table: MatTable<Test>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    protected apiService: ApiService,
  ) {}

  ngOnInit() {
    this.loadSubjects();
    this.viewAllTests();
  }

  private loadSubjects() {
    this.apiService.getEntity('Subject').subscribe((result: Subject[]) => {
      this.listSubjects = result;
    });
  }

  public addTestDialog(): void {
    const dialogRef = this.dialog.open(TestAddComponent, {
      width: '500px',
      data: {
        data: {},
        description: {
          title: 'Додати новий тест',
          action: 'Додати'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTest(result);
      }
    });
  }

  addTest(test: Test) {
    this.apiService.createEntity('Test', test).subscribe((result: Test[]) => {
      this.listTests.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
  public openDeleteDialog(test: Test) {
    const message = `Підтвердіть видалення тесту ${test.test_name}?`;

    this.apiService.openConfirmModal(message, () => this.removeTest(test.test_id));
  }

  public editTestDialog(test: Test): void {
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
        this.editTest(result);
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
    this.apiService.insertData('test', test).subscribe((result: Test[]) => {
      this.listTests.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
  }

  private editTest(test: Test): void {
    this.apiService.update('test', test.test_id, test).subscribe((result: Test[]) => {
      this.listTests = result;
      this.dataSource.data = this.listTests;
    }, (error: any) => {
      this.apiService.openErrorModal('Помилка оновлення');
    });
  }

  private removeTest(id: number) {
    this.apiService.del('test', id)
      .subscribe((response) => {
          this.apiService.openInfoModal('Тест видалено');
          this.viewAllTests();
        },
        err => {
          this.apiService.openErrorModal('Помилка видалення');
        });
  }

  private loadSubjects() {
    this.apiService.getRecords('subject').subscribe((result: Subject[]) => {
      this.listSubjects = result;
    });
  }

  private viewAllTests() {
    this.apiService.getEntity('Test').subscribe((result: Test[]) => {
      this.listTests = result;
      this.dataSource.data = this.listTests;
    });
    this.dataSource.paginator = this.paginator;
  }
}
