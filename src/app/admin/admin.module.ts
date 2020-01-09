import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';


const adminRoutes: Routes = [
  {
    path: '',
        component: AdminComponent,
        children: [
          { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
          { path: 'subjects', loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule) },
          { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
          { path: 'faculties', loadChildren: () => import('./faculties/faculties.module').then(m => m.FacultiesModule) },
          { path: 'specialities', loadChildren: () => import('./specialities/specialities.module').then(m => m.SpecialitiesModule) },
        ]
  },
];
@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
