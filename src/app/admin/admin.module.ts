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
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { GroupAddDialogComponent } from './group-add-dialog/group-add-dialog.component';
import { GroupDelDialogComponent } from './group-del-dialog/group-del-dialog.component';
import { GroupEditDialogComponent } from './group-edit-dialog/group-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';

const routes: Routes = [
  { path: '', component: AdminComponent ,
    children: [
      { path: 'exams/:id', component: TestComponent },
      { path: 'exams/:id/questions', component: QuestionComponent },
      { path: 'exams/:id/questions/new', component: NewQuestionComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'faculties', component: FacultiesComponent},
      { path: 'group', component: GroupComponent },
      { path: 'group_add', component: GroupAddDialogComponent },
      { path: 'group_edit', component: GroupEditDialogComponent },
      { path: 'group_delete', component: GroupDelDialogComponent },
      { path: 'group_view', component: GroupViewDialogComponent },
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
    TestComponent,
    QuestionAnswerComponent,
    QuestionComponent,
    NewQuestionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [ConfirmDiaglogComponent]
})
export class AdminModule {}
