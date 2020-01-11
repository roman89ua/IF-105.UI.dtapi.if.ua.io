import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './test/question/question.component';
import { SharedModule } from '../shared/shared.module';
import { NewQuestionComponent } from './test/question/new-question/new-question.component';
import { QuestionAnswerComponent } from './test/question/new-question/question-answer/question-answer.component';



const adminRoutes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'exams', component: TestComponent },
  { path: 'exams/:id/questions', component: QuestionComponent },
  { path: 'exams/:id/questions/new', component: NewQuestionComponent }
];
@NgModule({
  declarations: [AdminPanelComponent, TestComponent, QuestionComponent, NewQuestionComponent, QuestionAnswerComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(adminRoutes),
=======
import { StudentsComponent } from './students/students.component';


const routes: Routes = [
  { path: '', component: AdminComponent , 
    children:[
      { path: 'students', component: StudentsComponent }
      // Here you can add routes for your entities
  ]}
];
@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
>>>>>>> master
  ]
})
export class AdminModule { }
