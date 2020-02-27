import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { Column } from '../entity.interface';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {


  displayedColumns;
  @Input() data;
  @Input() columns: Column[];
  dataSource: MatTableDataSource<any>;

  constructor() {
  }
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columns.map(item => item.columnDef);
  }
  ngOnInit() {
    console.log(this.columns);
  }
  check(element, item) {
    console.log(element);
    console.log(item);
  }
}
