import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './test/question/question.component';
import { NewQuestionComponent } from './test/question/new-question/new-question.component';
import { QuestionAnswerComponent } from './test/question/new-question/question-answer/question-answer.component';
import { StudentsComponent } from './students/students.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { ConfirmDiaglogComponent } from './confirm-diaglog/confirm-diaglog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { GroupAddEditDialogComponent } from './group/group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupDelDialogComponent } from './group/group-del-dialog/group-del-dialog.component';
import { GroupViewDialogComponent } from './group/group-view-dialog/group-view-dialog.component';
import { AdminUserService } from './admin-user/admin-user.service';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { SharedModule } from '../shared/shared.module';
import { CreateAdminUserComponent } from './admin-user/create-admin-user/create-admin-user.component';
import { SpecialityListComponent } from './speciality/speciality-list/speciality-list.component';
import { DialogFormComponent } from './speciality/dialog-form/dialog-form.component';
import { DialogConfirmComponent } from './speciality/dialog-confirm/dialog-confirm.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'exams/:id', component: TestComponent },
      { path: 'exams/:id/questions', component: QuestionComponent },
      { path: 'exams/:id/questions/new', component: NewQuestionComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'admin-user', component: AdminUserComponent},
      { path: 'faculties', component: FacultiesComponent},
      { path: 'group', component: GroupComponent },
      { path: 'speciality', component: SpecialityListComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    FacultiesComponent,
    ConfirmDiaglogComponent,
    GroupComponent,
    GroupAddEditDialogComponent,
    GroupDelDialogComponent,
    GroupViewDialogComponent,
    TestComponent,
    QuestionAnswerComponent,
    QuestionComponent,
    NewQuestionComponent,
    AdminUserComponent,
    CreateAdminUserComponent,
    SpecialityListComponent,
    DialogFormComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AdminUserService],
  entryComponents: [
    ConfirmDiaglogComponent,
    CreateAdminUserComponent,
    DialogFormComponent,
    DialogConfirmComponent,
    GroupAddEditDialogComponent,
    GroupDelDialogComponent,
    GroupViewDialogComponent
  ]
})
export class AdminModule { }
