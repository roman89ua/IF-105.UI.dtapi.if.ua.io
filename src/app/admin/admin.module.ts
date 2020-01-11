import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { Routes, RouterModule } from "@angular/router";
import { GroupComponent } from "./group/group.component";
import { GroupAddDialogComponent } from './group-add-dialog/group-add-dialog.component';
import { GroupDelDialogComponent } from './group-del-dialog/group-del-dialog.component';
import { GroupEditDialogComponent } from './group-edit-dialog/group-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';

import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";

const adminRoutes: Routes = [
  { path: "", component: AdminComponent },
  { path: "group", component: GroupComponent },
  { path: "group_add", component: GroupAddDialogComponent },
  { path: "group_edit", component: GroupEditDialogComponent },
  { path: "group_delete", component: GroupDelDialogComponent },
  { path: "group_view", component: GroupViewDialogComponent },
];

@NgModule({
  declarations: [
    AdminComponent,
    GroupComponent,
    GroupAddDialogComponent,
    GroupDelDialogComponent,
    GroupEditDialogComponent,
    GroupViewDialogComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(adminRoutes),
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class AdminModule {}
