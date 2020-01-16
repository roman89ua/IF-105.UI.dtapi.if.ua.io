import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { ConfirmDiaglogComponent, ConfirmDialogModel } from '../confirm-diaglog/confirm-diaglog.component';
import { HttpService } from 'src/app/shared/http.service';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { Faculty } from 'src/app/shared/entity.interface';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit, AfterViewInit {
  result: any;
  faculties: Faculty[] = [];
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  id: number;
  loading = false;


  dataSource = new MatTableDataSource<Faculty>();


  @ViewChild('table', { static: false }) table: MatTable<Element>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private http: HttpService) { }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  ngOnInit(): void {
    this.getFaculty();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getFaculty() {
    this.loading = true;
    this.http.getRecords('faculty')
      .subscribe(response => {
        this.dataSource.data = response;
        this.loading = false;
      });
  }

  addFaculty(faculty: Faculty) {
    this.http.insertData('faculty', faculty)
      .subscribe(response => {
        this.dataSource.data = [...this.dataSource.data, response[0]];
        this.table.renderRows();
        this.openSnackBar('Факультет додано');
      },
      err => {
        this.openSnackBar('Такий факультет уже існує');
      }
      );
  }

  updateFaculty(id: number, faculty: Faculty) {
    this.http.update('faculty', id, faculty)
      .subscribe(response => {
        this.openSnackBar('Факультет оновлено');
        this.getFaculty();
      },
      err => {
          this.openSnackBar('Такий факультет уже існує');
      }
      );
  }
  createFacultyDialog() {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.addFaculty(this.result);
      } else { return; }
    });
  }
  updateFacultyDialog(faculty: Faculty) {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '400px',
      data: faculty
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.updateFaculty(faculty.faculty_id, this.result);
      } else { return; }
    });
  }

  deleteFacultyDialog(faculty: Faculty): void {
    const dialogData = new ConfirmDialogModel(`Ви дійсно бажаєте видалити: ${faculty.faculty_name}?`);
    const dialogRef = this.dialog.open(ConfirmDiaglogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.removeFaculty(faculty.faculty_id);
      } else { return; }
    });
  }

  removeFaculty(id: number) {
    this.http.del('faculty', id)
      .subscribe((response) => {
        this.openSnackBar('Факультет видалено');
        this.dataSource.data = this.dataSource.data.filter(item => item.faculty_id !== id);
      });
  }
}
