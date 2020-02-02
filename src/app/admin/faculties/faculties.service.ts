import { Injectable } from '@angular/core';
import { Faculty } from 'src/app/shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material';
import { CreateEditComponent } from './create-edit/create-edit.component';


@Injectable()
export class FacultiesService {
  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  getFaculties() {
    return this.apiService.getEntity('faculty');
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
