import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminPanelComponent } from "./admin-panel-page/admin-panel.component";
import { Routes, RouterModule } from "@angular/router";
import {
  GroupComponent,
  GroupComponentDelete,
  GroupComponentEdit,
  GroupComponentView
} from "./group/group.component";
import { GroupDialogAddComponent } from './group/groupDialogAdd/groupDialogAdd.component';

import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";

const adminRoutes: Routes = [
  { path: "", component: AdminPanelComponent },
  { path: "group", component: GroupComponent },
  { path: "group_add", component: GroupDialogAddComponent },
  { path: "group_edit", component: GroupComponentEdit },
  { path: "group_delete", component: GroupComponentDelete },
  { path: "group_view", component: GroupComponentView }
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    GroupComponent,
    GroupDialogAddComponent,
    GroupComponentDelete,
    GroupComponentEdit,
    GroupComponentView
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
