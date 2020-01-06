import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel-page/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';
import { FacultyComponent } from './faculty/faculty.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';



const adminRoutes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'faculty', component: FacultyComponent },
];
@NgModule({
  declarations: [AdminPanelComponent, FacultyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
    SharedModule
  ]
})
export class AdminModule { }
