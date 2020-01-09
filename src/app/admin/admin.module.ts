import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel-page/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';


const adminRoutes: Routes = [
  { path: '', component: AdminPanelComponent },
];
@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class AdminModule { }
