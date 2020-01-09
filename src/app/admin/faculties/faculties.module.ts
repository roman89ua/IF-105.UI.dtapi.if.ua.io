import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FacultiesComponent } from './faculties.component';


const routes: Routes = [
  { path: '', component: FacultiesComponent }
];

@NgModule({
  declarations: [FacultiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FacultiesModule { }
