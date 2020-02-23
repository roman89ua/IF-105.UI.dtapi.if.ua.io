import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaginatorService } from './paginator.service';
import { PageEvent, MatPaginator } from '@angular/material';
import { PaginationModel } from './PaganationModel';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent extends PaginationModel implements OnInit {
  countRecords: number;
  @Input() entity2: string;
  @Output() changed: EventEmitter<PaginationModel> = new EventEmitter<PaginationModel>();
  @ViewChild('matPaginator', { static: true }) matPaginator: MatPaginator;
  @Output() paginator: EventEmitter<MatPaginator> = new EventEmitter<MatPaginator>();
  @Output() data: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  // pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];



  public onPaginationChange(paginationEvent: PageEvent): void {

    this.pageChange(paginationEvent);

    this.getRange2((response) => {
      this.data.emit(response);
     });
    this.getCountRecords2(data => {
       this.countRecords = data.numberOfRecords;
     });
  }

  constructor(paginatorService: PaginatorService) {
    super(paginatorService);
  }


  ngOnInit() {
    this.paginator.emit(this.matPaginator);
    this._entity = this.entity2;

    this.getRange2((response) => {
     this.data.emit(response);
    });
    this.getCountRecords2(data => {
      this.countRecords = data.numberOfRecords;
    });
  }



}
