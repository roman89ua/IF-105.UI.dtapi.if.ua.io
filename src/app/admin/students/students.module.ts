import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';


const routes: Routes = [
  { path: '', component: StudentsComponent }
];

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentsModule { }
