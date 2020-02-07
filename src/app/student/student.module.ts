import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { Routes, RouterModule } from '@angular/router';
import {MatButtonModule, MatIconModule, MatTableModule, MatTabsModule} from '@angular/material';

const routes: Routes = [
  {
    path: '', component: StudentComponent,
  }
];

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
  ]
})
export class StudentModule { }
