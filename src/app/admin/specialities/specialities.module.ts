import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SpecialitiesComponent } from './specialities.component';


const routes: Routes = [
  { path: '', component: SpecialitiesComponent }
];

@NgModule({
  declarations: [SpecialitiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SpecialitiesModule { }
