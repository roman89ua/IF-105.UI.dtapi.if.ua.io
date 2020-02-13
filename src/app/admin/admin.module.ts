import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {Routes, RouterModule} from '@angular/router';
import {QuestionsComponent} from './questions/questions.component';
import {NewQuestionComponent} from './questions/new-question/new-question.component';
import {StudentsComponent} from './students/students.component';
import {StudentsService} from './students/services/students.service';
import {FacultiesComponent} from './faculties/faculties.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GroupComponent} from './group/group.component';
import {GroupAddEditDialogComponent} from './group/group-add-edit-dialog/group-add-edit-dialog.component';
import {GroupViewDialogComponent} from './group/group-view-dialog/group-view-dialog.component';
import {AdminUserService} from './admin-user/admin-user.service';
import {CreateUpdateUserComponent} from './admin-user/create-update-user/create-update-user.component';
import {AdminUserComponent} from './admin-user/admin-user.component';
import {SharedModule} from '../shared/shared.module';
import {SpecialityListComponent} from './speciality/speciality-list/speciality-list.component';
import {DialogFormComponent} from './speciality/dialog-form/dialog-form.component';
import {NavbarComponent} from './sidenav/sidenav.component';
import {CreateEditComponent} from './faculties/create-edit/create-edit.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {SubjectsCreateModalComponent} from './subjects/subjects-create-modal/subjects-create-modal.component';
import {MatDialogModule} from '@angular/material';
import {TimeTableComponent} from './time-table/time-table.component';
import {TimeTableAddDialogComponent} from './time-table/time-table-add-dialog/time-table-add-dialog.component';
import {QuestionTypePipe} from './questions/pipes/question-type.pipe';
import {StudentsModalWindowComponent} from './students/students-modal-window/students-modal-window.component';
import { TestListComponent } from './tests/list/test-list.component';
import { TestAddComponent } from './tests/add/test-add.component';
import { TestDetailListComponent } from './test-detail/list/test-detail-list.component';
import { TestDetailAddComponent } from './test-detail/add/test-detail-add.component';
import {TimeTablePipe} from './time-table/pipes/time-table.pipe';
import { ResultsComponent } from './results/results.component';
import { ResultsService } from './results/results.service';
import { GroupModalService } from './group/group-modal.service';
import { GroupService } from './group/group.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferStudentModalWindowComponent } from './students/transfer-student-modal-window/transfer-student-modal-window.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'tests/:id/questions/:questionId/:mode', component: NewQuestionComponent },
      { path: 'tests/:id/questions', component: QuestionsComponent },
      { path: 'tests/:id/questions/new', component: NewQuestionComponent },
      { path: 'Students/:id', component: StudentsComponent },
      { path: 'admin-user', component: AdminUserComponent},
      { path: 'faculties', component: FacultiesComponent},
      { path: 'group', component: GroupComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'speciality', component: SpecialityListComponent },
      { path: 'timeTable', component: TimeTableComponent },
      { path: 'tests', component: TestListComponent },
      { path: 'test-detail', component: TestDetailListComponent },
      { path: 'results', component: ResultsComponent },
    ]}
];
@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    StudentsModalWindowComponent,
    FacultiesComponent,
    GroupComponent,
    GroupAddEditDialogComponent,
    GroupViewDialogComponent,
    TestListComponent,
    TestAddComponent,
    TestDetailListComponent,
    TestDetailAddComponent,
    QuestionsComponent,
    NewQuestionComponent,
    AdminUserComponent,
    CreateUpdateUserComponent,
    SpecialityListComponent,
    DialogFormComponent,
    NavbarComponent,
    CreateEditComponent,
    SubjectsComponent,
    SubjectsCreateModalComponent,
    TimeTableComponent,
    TimeTablePipe,
    TimeTableAddDialogComponent,
    QuestionTypePipe,
    DashboardComponent,
    ResultsComponent,
    TransferStudentModalWindowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
  ],
  providers: [
    AdminUserService,
    StudentsService,
    ResultsService,
    GroupModalService,
    GroupService
  ],
  entryComponents: [
    NavbarComponent,
    CreateUpdateUserComponent,
    DialogFormComponent,
    GroupAddEditDialogComponent,
    CreateEditComponent,
    GroupViewDialogComponent,
    SubjectsCreateModalComponent,
    TestAddComponent,
    TestDetailAddComponent,
    TimeTableAddDialogComponent,
    TransferStudentModalWindowComponent,
    StudentsModalWindowComponent,
  ]
})
export class AdminModule { }
