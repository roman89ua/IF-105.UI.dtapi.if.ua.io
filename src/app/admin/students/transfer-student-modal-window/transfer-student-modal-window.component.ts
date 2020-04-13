import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Faculty, Group, ResponseInterface } from 'src/app/shared/entity.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-transfer-student-modal-window',
  templateUrl: './transfer-student-modal-window.component.html',
  styleUrls: ['./transfer-student-modal-window.component.scss']
})
export class TransferStudentModalWindowComponent implements OnInit {

  private username: string;
  private email: string;
  public response: object;
  public FACULTIES_LIST: Faculty[] = [];
  public GROUPS_LIST: Group[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<TransferStudentModalWindowComponent>,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.getUserData();
    this.getFaculty();
  }

  handleSubmit() {
    const studentDATA = {
        gradebook_id: this.data.student_data.gradebook_id,
        student_surname: this.data.student_data.student_surname,
        student_name: this.data.student_data.student_name,
        student_fname: this.data.student_data.student_fname,
        group_id: this.data.student_data.group_id,
        password: this.data.student_data.plain_password,
        username: this.username,
        email: this.email,
        photo: this.data.student_data.photo,
        password_confirm: this.data.student_data.plain_password,
        plain_password: this.data.student_data.plain_password
    };
    this.apiService.updEntity('Student', studentDATA, this.data.student_data.user_id).subscribe(
      (data: ResponseInterface) => this.dialogRef.close(data),
      error => this.dialogRef.close(error)
    );
  }

  closeModalWindow() {
    this.dialogRef.close('Canceled');
  }

  private getUserData() {
    this.apiService.getEntity('AdminUser', this.data.student_data.user_id).subscribe((result: any) => {
      this.username = result[0].username;
      this.email = result[0].email;
    },
    (error: ResponseInterface) => {
      this.modalService.openErrorModal('Можливі проблеми із сервером');
    });
  }

  public getFaculty() {
    this.apiService.getEntity('Faculty')
      .subscribe(response => {
        this.FACULTIES_LIST = response;
      },
      (error: ResponseInterface) => {
        this.modalService.openErrorModal('Можливі проблеми із сервером');
      });
  }

  public getGroupsByFaulty(elem: HTMLSelectElement) {
    const id = elem[0];
    this.data.student_data.group_id = undefined;
    return this.setGroupsByFaculty(id);
  }

  public getGroupId(elem: HTMLSelectElement) {
    const id = elem[0];
    return this.data.student_data.group_id = id;
  }

  private setGroupsByFaculty(id) {
    this.apiService.getEntityByAction('group', 'getGroupsByFaculty', id)
      .subscribe(response => {
        this.GROUPS_LIST = response;
      },
      (error: ResponseInterface) => {
        this.modalService.openErrorModal('Можливі проблеми із сервером');
      });
  }
}
