import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TestPlayerComponent } from './test-player/test-player.component';
import { QuestionMenuItemComponent } from './question-menu-item/question-menu-item.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { TestPlayerService } from './test-player.service';

const routes: Routes = [
  {
    path: '', component: StudentComponent,
    children: [
      { path: 'test-player/:id', component: TestPlayerComponent },
    ],
  }
];

@NgModule({
  declarations: [
    StudentComponent,
    TestPlayerComponent,
    QuestionMenuItemComponent,
    QuestionAnswerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [
    TestPlayerService,
  ]
})
export class StudentModule { }
