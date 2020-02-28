import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { Column, tableActionsType } from '../entity.interface';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {


  displayedColumns;
  @Input() data;
  @Input() columns: Column[];
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;

  constructor() {
  }
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columns.map(item => item.columnDef);
  }
  ngOnInit() {}

  getEvent(actiontype: tableActionsType, obj: any) {
    this.action.emit({
      actiontype,
     body: {...obj}
    });
}
}
