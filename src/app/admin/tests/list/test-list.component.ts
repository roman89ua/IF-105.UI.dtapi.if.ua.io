import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpService } from '../../../shared/http.service';
import { Test } from '../../entity.interface';
import { Subject } from '../../entity.interface';
import {MatTableDataSource, MatTable, MatSnackBar} from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TestAddComponent } from '../add/test-add.component';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-group',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
  listGroups: Test[] = [];
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
    protected httpService: HttpService,
    private modalService: ModalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadSubjects();
    this.viewAllTests();
  }

  private loadSubjects() {
    this.httpService.getRecords('subject').subscribe((result: Subject[]) => {
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

  private addTest(test: Test) {
    this.httpService.insertData('test', test).subscribe((result: Test[]) => {
      this.listGroups.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
  }

  public openConfirmDialog(test: Test) {
    const message = `Підтвердіть видалення тесту ${test.test_name}?`;

    this.modalService.openConfirmModal(message, () => this.removeTest(test.test_id));
  }

  private removeTest(id: number) {
    this.httpService.del('test', id)
      .subscribe((response) => {
          this.snackBar.open('Тест видалено', null, {
            duration: 2500,
          });
          this.dataSource.data = this.dataSource.data.filter(item => item.test_id !== id);
        },
        err => {
          this.snackBar.open('Помилка видалення', null, {
            duration: 2500,
          });
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

  private viewAllTests() {
    this.httpService.getRecords('test').subscribe((result: Test[]) => {
      this.listGroups = result;
      this.dataSource.data = this.listGroups;
    });
    this.dataSource.paginator = this.paginator;
  }
}
