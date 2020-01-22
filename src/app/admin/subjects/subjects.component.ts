import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectsCreateModalComponent } from './subjects-create-modal/subjects-create-modal.component';
import { SubjectsService } from './subjects.service';
import { ISubjects } from './subjects.interface';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubjectConfirmComponent } from './subject-confirm/subject-confirm.component';
import { MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from 'src/app/shared/http.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  
  public displayedColumns: string[] = ['subject_number', /*'subject_id',*/ 'subject_name', 'subject_description', 'subject_menu'];
  public dataSource = new MatTableDataSource<ISubjects>();
  public loading = false; 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog, private subjectsService: SubjectsService, private snackBar: MatSnackBar, private http: HttpService) { }

  ngOnInit(): void  {
    this.showSubjects();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showSubjects() {
    this.loading = true;
    this.http.getRecords('subject')
      .subscribe(response => {
        this.dataSource.data = response;
        this.loading = false;
      }
    );
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  createNewSubject() {
    const newDialogSubject = this.dialog.open(SubjectsCreateModalComponent, {
      width: '500px',
      disableClose: true,
    });
    newDialogSubject.afterClosed()
      .pipe(
        mergeMap((data) => {
          if (data) {
            return this.http.insertData('subject', data);
          }
          return of(null);
        })
        
      )
      .subscribe((newData: ISubjects[] | null) => {
        if (newData) {
          this.dataSource.data = [...this.dataSource.data, newData[0]];
          this.openSnackBar('Предмет було створено.', 'Закрити');
      }},
        err => {
          this.openSnackBar('Такий предмет уже існує', 'Закрити');
        }
      );
  }

  edit(row: ISubjects): void{
    const newDialogSubject = this.dialog.open(SubjectsCreateModalComponent, {
      width: '500px',
      data: row,
      
    });
    newDialogSubject.afterClosed()
      .pipe(
        mergeMap((data) => {
          if (data) {
            return this.http.update('subject', row.subject_id, data);
          }
          return of(null);
        })
      )
      .subscribe((newData: ISubjects[] | null) => {
        if (newData) {
          this.showSubjects();
          this.openSnackBar('Предмет відредаговано.', 'Закрити');
        }},
        err => {
          this.openSnackBar('Такий предмет уже існує', 'Закрити');
        }
      );  
  }

  delete(row: ISubjects): void {
    const dialogData = `Ви видаляєте ${row.subject_name}, ви впевнені?`;
    const dialogRef = this.dialog.open(SubjectConfirmComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      if (result) {
        this.delSubject(row.subject_id);
      }
    });
  }
  delSubject(id: number) {
    this.http.del('Subject',id)
      .subscribe((response) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.subject_id !== id);
        this.openSnackBar('Предмет видалено.', 'Закрити');
      },
        err => {
          this.openSnackBar('На сервері присутні дані цього предмету.', 'Закрити');
        }
      );
  }
}
