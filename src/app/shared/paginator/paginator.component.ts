import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaginatorService } from './paginator.service';
import { PageEvent, MatPaginator } from '@angular/material';
import { Pagination } from './PaginationInterface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() countRecords;
  @Output() changed: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @ViewChild('matPaginator', { static: true }) matPaginator: MatPaginator;
  @Output() paginator: EventEmitter<MatPaginator> = new EventEmitter<MatPaginator>();

  pageSize;
  pageSizeOptions;



 public onPaginationChange(paginationEvent: PageEvent): void {
  this.changed.emit(this.parsePagination(paginationEvent));
}

private parsePagination(value: PageEvent): Pagination {
  return {
    length: value.length,
    pageIndex: value.pageIndex,
    pageSize: value.pageSize,
    offset: value.pageIndex * value.pageSize
  };
}
  constructor(private paginatorService: PaginatorService) { }


  ngOnInit() {
    this.pageSize = this.paginatorService.pageCount;
    this.pageSizeOptions = this.paginatorService.selectItemsPerPage;
    this.paginator.emit(this.matPaginator);
  }

}
