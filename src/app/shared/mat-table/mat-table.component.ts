import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {
  // export interface Faculty {
  //   faculty_id: number;
  //   faculty_name: string;
  //   faculty_description: string;
  // }

  displayedColumns: string[] = ['faculty_id', 'faculty_name', 'faculty_description', 'action'];
  displayed: string[] = ['ID', 'Фалькутет', 'Опис', 'Дії'];
  dataSource = new MatTableDataSource<any>();
  @Input() data;
  @Input() columns;


  constructor() { }

  ngOnInit() {

  }

}
