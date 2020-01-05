import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel-page/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './test/question/question.component';


const adminRoutes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'exams', component: TestComponent },
  { path: 'exams/questions/:id', component: QuestionComponent }
];
@NgModule({
  declarations: [AdminPanelComponent, TestComponent, QuestionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class AdminModule { }
