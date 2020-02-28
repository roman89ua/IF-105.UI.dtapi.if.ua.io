import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  countRecords: number;

  @Input() entity: string;
  @ViewChild('matPaginator', { static: true }) matPaginator: MatPaginator;
  @Output() paginator: EventEmitter<MatPaginator> = new EventEmitter<MatPaginator>();
  @Output() data: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(private apiService: ApiService) {

  }

  public onPaginationChange(paginationEvent: PageEvent): void {
    this.pageChange(paginationEvent);

    this.getRange((response) => {
      this.data.emit(response);
    });
    this.getCountRecords(data => {
      this.countRecords = data.numberOfRecords;
    });
  }
  getRange(callback) {
    this.apiService.getRecordsRange(this.entity, this.pageSize, this.pageIndex * this.pageSize)
      .subscribe(data => callback(data));
  }
  getCountRecords(callback) {
    this.apiService.getCountRecords(this.entity)
      .subscribe(data => callback(data));
  }
  pageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  ngOnInit() {
    this.paginator.emit(this.matPaginator);
    this.onPaginationChange({ previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 0 });
  }
}
