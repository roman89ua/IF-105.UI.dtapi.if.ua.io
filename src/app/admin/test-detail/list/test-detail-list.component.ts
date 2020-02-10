import {Component, OnInit, ViewChild} from '@angular/core';
import { Test} from '../../entity.interface';
import { TestDetail } from '../../entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail-list.component.html',
  styleUrls: ['./test-detail-list.component.scss'],
})

export class TestDetailListComponent implements OnInit {
  listTestsDetails: TestDetail[] = [];
  listTest: Test[] = [];
  dataSource = new MatTableDataSource<TestDetail>();
  displayedColumns: string[] = [
    'id',
    'test_id',
    'level',
    'tasks',
    'rate',
  ];


  @ViewChild('table', { static: true }) table: MatTable<TestDetail>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    protected apiService: ApiService,
    // private modalService: ModalService,
    // private route: ActivatedRoute,
    // private router: Router,
  ) {}

  ngOnInit() {
    this.loadTest();
    this.viewAllTestsDetails();
  }

  private loadTest() {
    this.apiService.getEntity('test').subscribe((result: Test[]) => {
      this.listTest = result;
    });
  }

  private viewAllTestsDetails() {
    this.apiService.getEntity('TestDetail').subscribe((result: TestDetail[]) => {
      this.listTestsDetails = result;
      this.dataSource.data = this.listTestsDetails;
    });
    this.dataSource.paginator = this.paginator;
  }
}
