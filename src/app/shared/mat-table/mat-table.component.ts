import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, PageEvent, MatPaginator } from '@angular/material';
import { Column, ActionButtons } from './mat-table.interface';



@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data;
  @Input() columns: Column[];
  @Input() countRecords: number;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageEvent = new EventEmitter<PageEvent>();

  dataSource: MatTableDataSource<any>;
  displayedColumns;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];
  @ViewChild('matPaginator', { static: true }) matPaginator: MatPaginator;

  constructor() {}

  ngOnChanges(): void {
    if (this.countRecords) {
      this.checkDataLength(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.matPaginator.length = this.countRecords;
      this.displayedColumns = this.columns.map(item => item.columnDef);
    } else {
      this.dataSource  = new MatTableDataSource(this.data);
      this.displayedColumns = this.columns.map(item => item.columnDef);
      this.dataSource.paginator = this.matPaginator;
    }

  }

  ngOnInit() {
    this.onPaginationChange({previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 0});
  }

  ngAfterViewInit(): void {}

  onPaginationChange(paginationEvent: PageEvent) {
    this.pageEvent.emit(paginationEvent);
  }
  checkDataLength(data: Array<any>) {
    if (!data.length) {
      this.matPaginator.previousPage();
    }
  }
  getEvent(action: ActionButtons, obj: any) {
    const {type, route} = action;
    this.action.emit(
      route ? { type, route, body: obj } : { type, body: obj }
     );

}
}
