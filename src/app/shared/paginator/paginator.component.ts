import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaginatorService } from './paginator.service';
import { PageEvent, MatPaginator } from '@angular/material';
import { PaginationModel } from './PaganationModel';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() countRecords;
  @Output() changed: EventEmitter<PaginationModel> = new EventEmitter<PaginationModel>();
  @ViewChild('matPaginator', { static: true }) matPaginator: MatPaginator;
  @Output() paginator: EventEmitter<MatPaginator> = new EventEmitter<MatPaginator>();

  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];



 public onPaginationChange(paginationEvent: PageEvent): void {
   const page = new PaginationModel(paginationEvent.pageSize, paginationEvent.pageIndex);
   this.changed.emit(page);
}

  constructor(private paginatorService: PaginatorService) { }


  ngOnInit() {
    const page = new PaginationModel(this.pageSize, 0);
    this.changed.emit(page);
    this.paginator.emit(this.matPaginator);
  }

}
