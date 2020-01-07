import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel-page/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './test/question/question.component';
import { SharedModule } from '../shared/shared.module';



const adminRoutes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'exams', component: TestComponent },
  { path: 'exams/:id/questions', component: QuestionComponent }
];
@NgModule({
  declarations: [AdminPanelComponent, TestComponent, QuestionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class AdminModule { }
