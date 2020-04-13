import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProtocolService } from './protocol.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Protocol } from './protocol.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['userId', 'userName', 'testName', 'ipAddress', 'date', 'time'];
  public dataSource = new MatTableDataSource<Protocol>();

  @ViewChild('table') table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  logsDateForm: FormGroup;
  constructor(private protocolService: ProtocolService, private fb: FormBuilder, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.logsDateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required, [this.checkForCorrectData()]]
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    this.protocolService.getLogs(this.logsDateForm.value).pipe(
      mergeMap(res1 => {
        const tests = this.protocolService.getTests(this.protocolService.getTestIds(res1));
        const users = this.protocolService.getUsers(this.protocolService.getUserIds(res1));
        return forkJoin([of(res1), tests, users]);
      })
    ).subscribe(result => {
      result[0].length < 1 ? this.openSnackBar('Даних не знайдено') :
        this.dataSource.data = this.protocolService.getProtocolObj(result);
    });
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
/** checks if endDate is bigger than startDate */
  checkForCorrectData() {
    return (control: FormControl) => {
      if (new Date(control.value) < new Date(this.logsDateForm.value.startDate)) {
        return of({ dataIsNotCorrect: true });
      } else { return of(null); }
    };
  }

  hasError = (controlName: string, errorName: string) => {
    return this.logsDateForm.controls[controlName].hasError(errorName);
  }
}
