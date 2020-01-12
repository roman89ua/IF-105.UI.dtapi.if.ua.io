import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { Routes, RouterModule } from "@angular/router";
import { GroupComponent } from "./group/group.component";
import { GroupAddDialogComponent } from './group-add-dialog/group-add-dialog.component';
import { GroupDelDialogComponent } from './group-del-dialog/group-del-dialog.component';
import { GroupEditDialogComponent } from './group-edit-dialog/group-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';

import { StudentsComponent } from './students/students.component';
import { AdminUserService } from './admin-user/admin-user.service';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { DeleteConfirmationDialogComponent } from '../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { CreateAdminUserComponent } from './admin-user/create-admin-user/create-admin-user.component';

const adminRoutes: Routes = [
  { path: "", component: AdminComponent,
    children:[
      { path: 'students', component: StudentsComponent },
      { path: 'admin-user', component: AdminUserComponent},
      // Here you can add routes for your entities
    ]
  },
  { path: "group", component: GroupComponent },
  { path: "group_add", component: GroupAddDialogComponent },
  { path: "group_edit", component: GroupEditDialogComponent },
  { path: "group_delete", component: GroupDelDialogComponent },
  { path: "group_view", component: GroupViewDialogComponent },
];

@NgModule({
  declarations: [
    AdminComponent,
    GroupComponent,
    GroupAddDialogComponent,
    GroupDelDialogComponent,
    GroupEditDialogComponent,
    GroupViewDialogComponent,
    StudentsComponent,
    AdminUserComponent,
    CreateAdminUserComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(adminRoutes),
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminUserService,
  ],
  entryComponents: [
    CreateAdminUserComponent,
  ]
})
export class AdminModule {}
