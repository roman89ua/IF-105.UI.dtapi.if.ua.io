import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Faculty, Group, ResponseInterface, Speciality, Student } from 'src/app/shared/entity.interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { defaultImage } from 'src/app/shared/default-image/default-image';

@Component({
  selector: 'app-view-student-modal-window',
  templateUrl: './view-student-modal-window.component.html',
  styleUrls: ['./view-student-modal-window.component.scss']
})
export class ViewStudentModalWindowComponent implements OnInit {

  public username: string;
  public email: string;

  public response: object;
  public defaultImg = defaultImage;

  public StudentData: Student = this.data.student_data;
  public GroupData: Group;
  public FacultyData: Faculty;
  public SpecialityData: Speciality;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ViewStudentModalWindowComponent>,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.getUserData(this.data.student_data.user_id);
    this.getStudentInfo(this.data.group_id);
  }

  public closeModalWindow() {
    this.dialogRef.close();
  }

  private getUserData(id: number) {
    this.apiService.getEntity('AdminUser', id).subscribe((result: any) => {
      this.username = result[0].username;
      this.email = result[0].email;
    });
  }

  public getStudentInfo(id: number) {
    this.getGroupInfo(id);
  }

  public getGroupInfo(id: number) {
    this.apiService.getEntity('Group', id).subscribe((result: Group) => {
      this.GroupData = result[0];
      this.getSpecialityInfo(this.GroupData.speciality_id);
      this.getFacultyInfo(this.GroupData.faculty_id);
    },
    (error: ResponseInterface) => {
      this.modalService.openErrorModal('Можливі проблеми із сервером');
    });
  }

  public getSpecialityInfo(id: number) {
    this.apiService.getEntity('Speciality', id).subscribe((result: Speciality) => {
      this.SpecialityData = result[0];
    },
    (error: ResponseInterface) => {
      this.modalService.openErrorModal('Можливі проблеми із сервером');
    });
  }

  public getFacultyInfo(id) {
    this.apiService.getEntity('Faculty', id).subscribe((result: Faculty) => {
      this.FacultyData = result[0];
    },
    (error: ResponseInterface) => {
      this.modalService.openErrorModal('Можливі проблеми із сервером');
    });
  }
}
