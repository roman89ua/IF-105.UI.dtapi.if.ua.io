import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, PageEvent, MatPaginator, MatSort } from '@angular/material';
import { Column, ActionButtons } from './mat-table.interface';
import { ApiService } from '../services/api.service';
import { SpinnerService } from '../spinner/spinner.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() data: T[] = [];
  @Input() entity: string;
  @Input() columns: Column[];
  @Input() countRecords: number;
  @Input() filter: boolean;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageEvent = new EventEmitter<PageEvent>();

  dataSource: MatTableDataSource<T>;
  displayedColumns;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];
  @ViewChild('matPaginator', { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private apiService: ApiService, public spinnerService: SpinnerService) {}

  ngOnChanges(): void {
    if (this.countRecords) {
      this.checkDataLength(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.matPaginator.length = this.countRecords;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource  = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    }

  }

  ngOnInit() {
    this.displayedColumns = this.columns.map(item => item.columnDef);
  }

  ngAfterViewInit(): void {
    this.onPaginationChange({previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 0});
  }

  onPaginationChange(paginationEvent: PageEvent) {
    this.pageIndex = paginationEvent.pageIndex;
    this.pageSize = paginationEvent.pageSize;
    this.pageEvent.emit(paginationEvent);
  }
  checkDataLength(data: Array<T>) {
    if (!data.length) {
      this.matPaginator.previousPage();
    }
  }

  applyFilter(event: string) {
    event = event.trim();
    event = event.toLowerCase();
    this.dataSource.filter = event;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEvent(action: ActionButtons, obj: T) {
    const {type, route} = action;
    this.action.emit(
      route ? { type, route, body: obj } : { type, body: obj }
     );

}

getRange(callback) {
  this.apiService.getRecordsRange(this.entity, this.pageSize, this.pageIndex * this.pageSize)
      .subscribe(data => callback(data));
}
getCountRecords(callback) {
  this.apiService.getCountRecords(this.entity)
      .subscribe(data => callback(data));
}
getEntity(callback) {
  this.apiService.getEntity(this.entity)
  .subscribe(data => callback(data));
}
}
