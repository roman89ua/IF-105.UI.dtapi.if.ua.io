import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { PaginationModel } from './PaganationModel';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent extends PaginationModel implements OnInit {
  countRecords: number;

  @Input() setEntity: string;
  @ViewChild('matPaginator', { static: true }) matPaginator: MatPaginator;
  @Output() paginator: EventEmitter<MatPaginator> = new EventEmitter<MatPaginator>();
  @Output() data: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();


  pageSizeOptions = [5, 10, 20, 50];

  constructor(apiService: ApiService) {
    super(apiService);
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

  ngOnInit() {
    this.paginator.emit(this.matPaginator);
    this.setEntity = this.entity;
    this.onPaginationChange({previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 0});
  }
}
