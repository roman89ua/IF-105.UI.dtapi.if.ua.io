import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TestPlayerComponent } from './test-player/test-player.component';
import { QuestionMenuItemComponent } from './question-menu-item/question-menu-item.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { TestPlayerService } from './test-player.service';
import {MatButtonModule, MatIconModule, MatTableModule, MatTabsModule} from '@angular/material';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  {
    path: '', component: StudentComponent,
    children: [
      { path: 'test-player', component: TestPlayerComponent },
      { path: 'test', component: TestComponentComponent},
    ],
  }
];

@NgModule({
  declarations: [
    StudentComponent,
    TestPlayerComponent,
    QuestionMenuItemComponent,
    QuestionAnswerComponent,
    TestComponentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [
    TestPlayerService,
  ]
})
export class StudentModule { }
