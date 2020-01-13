import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminUserService } from '../admin-user.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrls: ['./create-admin-user.component.scss']
})
export class CreateAdminUserComponent implements OnInit {
  public addForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', []),
    password_confirm: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private adminUserService: AdminUserService,  public dialogRef: MatDialogRef<CreateAdminUserComponent>) { }

  ngOnInit() {
  }
  addAdminHandler() {
     this.dialogRef.close(this.addForm.value);
  }

  cancelCreateAdminHandler() {
    this.dialogRef.close();
  }
}
