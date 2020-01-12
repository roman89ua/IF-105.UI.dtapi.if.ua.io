import { Component, OnInit } from '@angular/core';
import { Speciality } from '.././../entity.interface'
import { ApiService } from '../api.service';

import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})


export class SpecialityListComponent implements OnInit {

  public entity = 'Speciality';
  faculties: Speciality[] = [];
  displayedColumns: string[] = [ 'code', 'name'];
  dataSource = new MatTableDataSource<Speciality>();

  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  SpecialityForm = new FormGroup({
    speciality_code: new FormControl(),
    speciality_name: new FormControl(),
  });
  UpdateForm = new FormGroup({
    speciality_code: new FormControl(),
    speciality_name: new FormControl(),
  });

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getSpeciality();
  }
  getSpeciality(): any {
    const action = 'getRecords';
    this.apiService.getEntity(this.entity, action).subscribe((data: Speciality[]) => this.dataSource.data = data);
  }

  // this.dataSource.data = response;

}
