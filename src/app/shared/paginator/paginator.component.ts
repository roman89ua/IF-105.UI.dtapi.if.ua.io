import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  @Input() dataSource: MatTableDataSource<any>;
  @Input() entity: string;
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  offset = 0;


  @ViewChild(MatPaginator, { static: true }) paginatorDOM: MatPaginator;

  @Output() paginator: EventEmitter<any> = new EventEmitter<any>();
  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
    console.log(this.entity);
  this.getListEntity(this.entity);
  this.getCountRecords(this.entity);
    // this.paginator.emit(this.paginatorDOM);
  }


  getListEntity(entity: string) {
    this.paginatorService.getRange(entity, this.offset, this.pageSize)
    .subscribe(response => this.dataSource.data = response);
  }

  getCountRecords(entity: string) {
    this.paginatorService.getCountRecords(entity)
    .subscribe(response => {
      this.length = response.numberOfRecords;
    });
  }

  Handler(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex * this.pageSize;
    this.getListEntity('Faculty');

  }

}
