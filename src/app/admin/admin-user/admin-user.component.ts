import { Component, OnInit } from '@angular/core';
import { AdminUserService } from './admin-user.service';
import { IAdminUser } from './admin-user.interface';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialog } from '@angular/material';
import { CreateAdminUserComponent } from './create-admin-user/create-admin-user.component';
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  public userList: Array<IAdminUser> = [];
  public displayedColumns: string[] = ['idColumn', 'userNameColumn', 'emailColumn', 'actionsColumn'];

  constructor(
    private adminUserService: AdminUserService,
    public dialogService: DialogService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.adminUserService.getUsers()
      .subscribe((data: Array<IAdminUser>) => {
        this.userList = data;
      }
    );

  }

  updateHandler(user: any) {
    const dialogRef = this.dialog.open(CreateAdminUserComponent, {
      width: '450px',
      disableClose: true,
      data: user,
    });

    dialogRef.afterClosed()
      .pipe(
        mergeMap((data) => {
          if (data) {
            return this.adminUserService.updateUser(data);
          }
          return of(null);
        })
      )
      .subscribe((newData: IAdminUser | null) => {
        if (newData) {
          this.userList = this.userList.map( user => {
            if(user.id === newData.id) {
              return newData;
            }
            return user;
          }) 
        }
      });
  }

  deleteHandler(name: string, id: number) {
    this.dialogService.openConfirmDialog({name, id})
    .pipe(
      mergeMap((result: any) => {
        if (result.isCanceled) {
          return of(result);
        }
        return this.adminUserService.deleteUser(result.id);
      })
    )
    .subscribe((data: any) => {
      if (data && data.isCanceled) {
        return;
      }
      if (data && data.response === 'ok') {
        this.userList = this.userList.filter(user => user.id !== id);
      }
    });

  }
  addAdminHandler() {
    const dialogRef = this.dialog.open(CreateAdminUserComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed()
      .pipe(
        mergeMap((data) => {
          if (data) {
            return this.adminUserService.insertUser(data);
          }
          return of(null);
        })
      )
      .subscribe((newData: IAdminUser | null) => {
        if (newData) {
          this.userList = [newData, ...this.userList];
        }
      });
  }
}
