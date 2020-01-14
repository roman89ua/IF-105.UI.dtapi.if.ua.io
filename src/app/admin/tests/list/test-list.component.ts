import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpService } from '../../../shared/http.service';
import { Test } from '../../entity.interface';
import { Subject } from '../../entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(protected httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit() {
    this._loadSubjects();
    this.viewAllTests();
  }

  _loadSubjects() {
    this.httpService.getRecords('subject').subscribe((result: Subject[]) => {
      this.listSubjects = result;
    });
  }

  getSubjectNameById(subjectId: number): string {
    const subject = this.listSubjects.filter(subjectItem => {
      return subjectItem.subject_id === subjectId;
    })[0];

    if (subject) {
      return subject.subject_name;
    }

    return 'Невизначений';
  }

  viewAllTests() {
    this.httpService.getRecords('test').subscribe((result: Test[]) => {
      this.listGroups = result;
      this.dataSource.data = this.listGroups;
    });
    this.dataSource.paginator = this.paginator;
  }
}
