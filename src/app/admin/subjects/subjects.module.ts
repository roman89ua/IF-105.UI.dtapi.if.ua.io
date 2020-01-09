import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects.component';


const routes: Routes = [
  { path: '', component: SubjectsComponent }
];

@NgModule({
  declarations: [SubjectsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SubjectsModule { }
