import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';


const routes: Routes = [
  { path: '', component: GroupsComponent }
];

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GroupsModule { }
