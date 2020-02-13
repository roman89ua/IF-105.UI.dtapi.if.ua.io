import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../shared/shared.module';
import { TestPlayerComponent } from './test-player/test-player.component';
import { QuestionMenuItemComponent } from './question-menu-item/question-menu-item.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { TestPlayerService } from './test-player.service';
import {MatButtonModule, MatIconModule, MatTableModule, MatTabsModule} from '@angular/material';
import { StudentInfoComponent } from './student-info/student-info.component';
import {CountdownModule} from 'ngx-countdown';

const routes: Routes = [
  {
    path: '', component: StudentComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: StudentInfoComponent },
      { path: 'test-player', component: TestPlayerComponent },
    ],
  }
];

@NgModule({
  declarations: [
    StudentComponent,
    TestPlayerComponent,
    QuestionMenuItemComponent,
    QuestionAnswerComponent,
    StudentInfoComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatTableModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        SharedModule,
        CountdownModule,
    ],
  providers: [
    TestPlayerService,
  ]
})
export class StudentModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
