import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { Routes, RouterModule } from "@angular/router";
import { GroupComponent } from "./group/group.component";
import { GroupDialogAddComponent } from './groupDialogAdd/groupDialogAdd.component';
import { GroupDialogDelComponent } from './groupDialogDel/groupDialogDel.component';
import { GroupDialogEditComponent } from './groupDialogEdit/groupDialogEdit.component';
import { GroupDialogViewComponent } from './groupDialogView/groupDialogView.component';

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
  { path: "group_add", component: GroupDialogAddComponent },
  { path: "group_edit", component: GroupDialogEditComponent },
  { path: "group_delete", component: GroupDialogDelComponent },
  { path: "group_view", component: GroupDialogViewComponent }
];

@NgModule({
  declarations: [
    AdminComponent,
    GroupComponent,
    GroupDialogAddComponent,
    GroupDialogDelComponent,
    GroupDialogEditComponent,
    GroupDialogViewComponent
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
