import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { Column } from '../entity.interface';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {


  displayedColumns;
  @Input() data;
  @Input() columns: Column[];


  constructor() {
  }

  ngOnInit() {
    this.displayedColumns = this.columns.map(item => item.columnDef);
  }

}
