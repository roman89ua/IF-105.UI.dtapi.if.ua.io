import { Injectable } from '@angular/core';
import { Faculty } from 'src/app/shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MatDialog } from '@angular/material';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class FacultiesService {
  private faculties: Faculty[] = [];
  private isListFacultyLoaded = false;
  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  getFaculties(): Faculty[] {
    this.findAllFaculties()
    .subscribe(data => this.faculties = data);
    return this.faculties;
  }

  findAllFaculties() {
    if (this.isListFacultyLoaded) {
      console.log('true');
      return of(this.faculties);
    } else {
      console.log('false');
      return this.apiService.getEntity('faculty')
        .pipe(tap((response) => {
          this.isListFacultyLoaded = true;
          this.faculties = response;
        }));
    }
    // return this.isListFacultyLoaded ? of(this.faculties) : this.apiService.getEntity('faculty')
    //   .pipe(tap(() => { this.isListFacultyLoaded = true; }));
    // this.apiService.getEntity('Faculty')
    // .subscribe((response: Faculty[]) => {
    //   this.faculties = response;
    // });
  }

  FacultyDialog(callback: (dialogResult: Faculty) => void, data = null) {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '400px',
      data
    });
    dialogRef.afterClosed().subscribe((dialogResult: Faculty) => {
      if (dialogResult) {
        callback(dialogResult);
      } else { return; }
    });
  }

}
