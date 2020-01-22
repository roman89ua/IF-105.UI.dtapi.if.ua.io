import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Group } from '../../shared/entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GroupAddEditDialogComponent } from './group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  listGroups: Group[] = [];
  dataSource = new MatTableDataSource<Group>();
  displayedColumns: string[] = [
    'id',
    'name',
    'students',
    'actions'
  ];

  @ViewChild('table', { static: true }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private apiService: ApiService, 
    public dialog: MatDialog, 
    private modalService: ModalService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.viewAllGroups();
  }

  viewAllGroups() {
    this.apiService.getEntity('Group').subscribe((result: Group[]) => {
      this.listGroups = result;
      this.dataSource.data = this.listGroups;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження списку груп');
    });
    this.dataSource.paginator = this.paginator;
  }

  // create modal window for add new group
  addGroupDialog(): void {
    const dialogRef = this.dialog.open(GroupAddEditDialogComponent, {
      width: '500px',
      data: {
        group: null,
        description: {
          title: 'Додати нову групу',
          action: 'Додати'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addGroup(result);
      }
    });
  }
  /** Add new group */
  addGroup(group: Group) {
    this.apiService.createEntity('Group', group).subscribe((result: Group[]) => {
      this.openSnackBar(`Групу ${group.group_name} успішно додано`);
      this.listGroups.push(result[0]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    }, (error: any) => {
      if (error.error.response.includes('Duplicate')) {
        this.modalService.openErrorModal(`Група "${group.group_name}" вже існує`);
      }
    });
  }
  /** open modal window for confirm delete */
  openConfirmDialog(group: Group) {
    const message = `Підтвердіть видалення групи "${group.group_name}"`;
    this.modalService.openConfirmModal(message, () => { this.delGroup(group); });
  }

  /** Delete group */
  delGroup(group: Group) {
    this.apiService.delEntity('Group', group.group_id).subscribe((result: any) => {
      if (result) {
        this.openSnackBar(`Групу ${group.group_name} успішно виделено`);
        this.listGroups = this.listGroups.filter(gr => gr !== group);
        this.dataSource.data = this.listGroups;
        this.table.renderRows();
        this.dataSource.paginator = this.paginator;
      }
    }, (error: any) => {
      if (error.error.response.includes('Cannot delete')) {
        this.modalService.openInfoModal('Неможливо видалити групу із студентами. Видаліть спочатку студентів даної групи');
      }
      else {
        this.modalService.openErrorModal('Помилка видалення');
      }
    });
  }
  // create modal window for edit group
  editGroupDialog(group: Group): void {
    const dialogRef = this.dialog.open(GroupAddEditDialogComponent, {
      width: '500px',
      data: {
        group: group,
        description: {
          title: 'Редагувати інформацію про групу',
          action: 'Зберегти зміни'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.group_id = group.group_id;
        this.editGroup(result);
      }
    });
  }
  /** Edit group */
  editGroup(group: Group): void {
    this.apiService.updEntity('group', group, group.group_id).subscribe((result: Group[]) => {
      const index: number = result
        ? this.listGroups.findIndex(
          gr => gr.group_id === result[0].group_id
        )
        : -1;
      if (index > -1) {
        this.openSnackBar('Дані успішно оновлено');
        this.listGroups[index] = result[0];
        this.dataSource.data = this.listGroups;
        this.table.renderRows();
      }
    }, (error: any) => {
      if (error.error.response.includes('Error when update')) {
        this.modalService.openInfoModal('Інформація про групу не змінювалися');
      }
      else {
        this.modalService.openErrorModal('Помилка оновлення');
      }
    });
  }

  // create modal window for view groups by speciality or faculty
  viewGroupDialog(action: string, title: string): void {
    const description = {'title': title, 'action': action};
    const dialogRef = this.dialog.open(GroupViewDialogComponent, {
      width: '500px',
      data: { description }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.viewGroups(result.action, result.id);
      }
    });
  }
  /** View groups by speciality or faculty */
  viewGroups(action: string, id: number): void {
    this.apiService.getEntityByAction('Group', action, id).subscribe((result: any) => {
      if (result.response) {
        this.dataSource.data = [];
        this.modalService.openInfoModal('Групи відсутні');
      } else {
        this.dataSource.data = result;
        this.table.renderRows();
        this.dataSource.paginator = this.paginator;
      }
    }, () => {
      this.modalService.openErrorModal('Неможливо відобразити дані');
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
