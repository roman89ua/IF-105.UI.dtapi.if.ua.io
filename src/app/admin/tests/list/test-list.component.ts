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

  constructor(protected apiService: ApiService, public dialog: MatDialog) { }

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
      this.listGroups.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
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
    this.apiService.getEntity('Test').subscribe((result: Test[]) => {
      this.listGroups = result;
      this.dataSource.data = this.listGroups;
    });
    this.dataSource.paginator = this.paginator;
  }
}
