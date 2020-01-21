import { Component, OnInit, Inject } from '@angular/core';
import { Speciality, Faculty } from '../../../shared/entity.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService} from '../../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';

export interface DialogData {
  data: any;
  id: number;
  action: string;
}
@Component({
  selector: 'app-group-view-dialog',
  templateUrl: './group-view-dialog.component.html',
  styleUrls: ['./group-view-dialog.component.scss']
})
export class GroupViewDialogComponent implements OnInit {
  specialities: Speciality[] = [];
  faculties: Faculty[] = [];

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<GroupViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    if (this.data.action === 'getGroupsBySpeciality' ) {
      this.apiService
      .getEntity('Speciality')
      .subscribe((result: Speciality[]) => {
        this.specialities = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    }
    if (this.data.action === 'getGroupsByFaculty') {
      this.apiService.getEntity('Faculty').subscribe((result: Faculty[]) => {
        this.faculties = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
    }
  }
}
