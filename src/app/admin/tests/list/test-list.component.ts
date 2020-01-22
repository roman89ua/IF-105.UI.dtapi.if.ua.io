import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Test } from '../../entity.interface';
import { Subject } from '../../entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TestAddComponent } from '../add/test-add.component';
import { ModalService } from '../../../shared/services/modal.service';
import {ApiService} from '../../../shared/services/api.service';

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
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.loadSubjects();
    this.viewAllTests();
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

  public openDeleteDialog(test: Test) {
    const message = `Підтвердіть видалення тесту ${test.test_name}?`;

    this.modalService.openConfirmModal(message, () => this.removeTest(test.test_id));
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
    this.apiService.createEntity('test', test).subscribe((result: Test[]) => {
      this.listTests.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
  }

  private editTest(test: Test): void {
    this.apiService.updEntity('test', test, test.test_id).subscribe((result: Test[]) => {
      this.listTests = result;
      this.dataSource.data = this.listTests;
    }, (error: any) => {
      this.modalService.openErrorModal('Помилка оновлення');
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
    this.apiService.getEntity('test').subscribe((result: Test[]) => {
      this.listTests = result;
      this.dataSource.data = this.listTests;
    });
    this.dataSource.paginator = this.paginator;
  }
}
