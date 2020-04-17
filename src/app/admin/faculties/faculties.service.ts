import { Injectable } from '@angular/core';
import { Faculty } from 'src/app/shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditComponent } from './create-edit/create-edit.component';


@Injectable()
export class FacultiesService {
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog) { }


  openAddFacultyDialog(data = null) {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '400px',
      data
    });
    return dialogRef.afterClosed();
}

  createFaculty(faculty: Faculty) {
    return this.apiService.createEntity('Faculty', faculty);

  }
  updateFaculty(id: number, faculty: any) {
    return this.apiService.updEntity('Faculty', faculty, id);
  }

  deleteFaculty(id: number) {
    return this.apiService.delEntity('Faculty', id);
  }
}
