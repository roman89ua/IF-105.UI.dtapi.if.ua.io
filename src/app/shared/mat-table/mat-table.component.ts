import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Column, ActionButtons } from './mat-table.interface';
import { ApiService } from '../services/api.service';
import { SpinnerService } from '../spinner/spinner.service';
import { debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';



@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data: any[] = [];
  @Input() entity: string;
  @Input() columns: Column[];
  @Input() countRecords: number;
  @Input() filter: boolean;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageEvent = new EventEmitter<PageEvent>();

  dataSource: MatTableDataSource<any>;
  displayedColumns;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];
  isLoading = false;

  @ViewChild('matPaginator') matPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') input: ElementRef;

  constructor(private apiService: ApiService, public spinnerService: SpinnerService) {
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    if (this.countRecords) {
      this.checkDataLength(this.data);
      this.matPaginator.length = this.countRecords;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    }

  }

  ngOnInit() {
    this.displayedColumns = this.columns.map(item => item.columnDef);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
    if (this.filter) {
      fromEvent<any>(this.input.nativeElement, 'keyup')
        .pipe(
          tap(event => this.dataSource.filter = event.target.value),
          map(event => event.target.value),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(search => this.checkInput(search) ? this.apiService.getSearch(this.entity, search) : of(this.data))
        )
        .subscribe((response: any) => {
          if (response.response === 'no records') {
            this.dataSource.data = [];
          } else { this.dataSource.data = response; }
        });
    }
  }
  checkInput(str: string) {
    return str.trim() && !this.data.find(item => JSON.stringify(item).includes(str));
  }
  onPaginationChange(paginationEvent: PageEvent) {
    this.pageIndex = paginationEvent.pageIndex;
    this.pageSize = paginationEvent.pageSize;
    this.pageEvent.emit(paginationEvent);
  }
  checkDataLength(data: Array<any>) {
    if (!data.length) {
      this.matPaginator.previousPage();
    }
  }

  getEvent(action: ActionButtons, obj: any) {
    const { type, route } = action;
    this.action.emit(
      route ? { type, route, body: obj } : { type, body: obj }
    );

  }

  getRange(callback) {
    setTimeout(() => this.isLoading = true);
    this.apiService.getRecordsRange(this.entity, this.pageSize, this.pageIndex * this.pageSize)
      .subscribe(data => {
        callback(data);
        this.isLoading = false;
      });
  }
  getCountRecords(callback) {
    this.apiService.getCountRecords(this.entity)
      .subscribe(callback);
  }
  getEntity(callback) {
    this.apiService.getEntity(this.entity)
      .subscribe(data => callback(data));
  }

}

