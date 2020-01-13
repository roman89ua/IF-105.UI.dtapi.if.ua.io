import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { ConfirmDiaglogComponent } from './confirm-diaglog/confirm-diaglog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { GroupAddDialogComponent } from './group-add-dialog/group-add-dialog.component';
import { GroupDelDialogComponent } from './group-del-dialog/group-del-dialog.component';
import { GroupEditDialogComponent } from './group-edit-dialog/group-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';
import { AdminUserService } from './admin-user/admin-user.service';
import { AdminUserComponent } from './admin-user/admin-user.component';import { SharedModule } from '../shared/shared.module';
import { CreateAdminUserComponent } from './admin-user/create-admin-user/create-admin-user.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsCreateModalComponent } from './subjects/subjects-create-modal/subjects-create-modal.component';

const routes: Routes = [
  { path: '', component: AdminComponent ,
    children: [
      { path: 'students', component: StudentsComponent },
      { path: 'admin-user', component: AdminUserComponent},
      { path: 'faculties', component: FacultiesComponent},
      { path: 'group', component: GroupComponent },
      { path: 'group_add', component: GroupAddDialogComponent },
      { path: 'group_edit', component: GroupEditDialogComponent },
      { path: 'group_delete', component: GroupDelDialogComponent },
      { path: 'group_view', component: GroupViewDialogComponent },
      { path: 'subjects', component: SubjectsComponent },
      
  ]}
];

@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    FacultiesComponent,
    ConfirmDiaglogComponent,
    GroupComponent,
    GroupAddDialogComponent,
    GroupDelDialogComponent,
    GroupEditDialogComponent,
    GroupViewDialogComponent,
    StudentsComponent,
    AdminUserComponent,
    CreateAdminUserComponent,
    SubjectsComponent,
    SubjectsCreateModalComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AdminUserService,
  ],
  entryComponents: [
    ConfirmDiaglogComponent,
    CreateAdminUserComponent,
  ]
})
export class AdminModule {}
