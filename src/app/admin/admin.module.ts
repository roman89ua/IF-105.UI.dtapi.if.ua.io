import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';


const routes: Routes = [
  { path: '', component: AdminComponent , 
    children:[
      { path: 'students', component: StudentsComponent }
      // Here you can add routes for your entities
  ]}
];
@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
