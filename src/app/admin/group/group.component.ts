import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Group, Speciality, Faculty } from '../../shared/entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { GroupModalService } from './group-modal.service';
import { DialogData } from './group-modal.interface';
import { GroupService } from './group.service';
import { GroupAddEditDialogComponent } from './group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupViewDialogComponent } from './group-view-dialog/group-view-dialog.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, AfterViewInit {
  listGroups: Group[] = [];
  listSpeciality: Speciality[] = [];
  listFaculty: Faculty[] = [];
  dataSource = new MatTableDataSource<Group>();
  displayedColumns: string[] = [
    'id',
    'name',
    'speciality',
    'faculty',
  //  'students',
    'actions'
  ];
  /** properties for pagination */
  itemsCount: number;
  pageSize = 10;
  currentPage = 0;
  /** properties for get group for features */
  isCheckSpeciality = false;
  isCheckFaculty = false;
  feature: string;

  @ViewChild('table', { static: true }) table: MatTable<Group>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private modalService: ModalService,
    private snackBar: MatSnackBar,
    private groupModalService: GroupModalService,
    public groupService: GroupService
    ) { }

  ngOnInit() {
    this.getCountRecords('group');
    forkJoin(
      this.groupService.getListSpeciality(),
      this.groupService.getListFaculty(),
      this.groupService.getListGroup(this.pageSize)
    ).subscribe(([res1, res2, res3]) => {
      this.listSpeciality = res1;
      this.listFaculty = res2;
      this.listGroups = this.groupService.addPropertyToGroup(res3, res1, res2);
      this.dataSource.data = this.listGroups;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 /** Handler for pagination */
  onPaginateChange(data: MatPaginator) {
    this.pageSize = data.pageSize;
    this.currentPage = data.pageIndex;
    const offset = this.pageSize * this.currentPage;
    this.getListGroups(offset);
  }
  /** Get part (size page) list of groups */
  getListGroups(offset: number = 0) {
    this.groupService.getListGroup(this.pageSize, offset).subscribe((result: Group[]) => {
      this.isCheckFaculty = false;
      this.isCheckSpeciality = false;
      this.dataSource.data = this.groupService.addPropertyToGroup(result, this.listSpeciality, this.listFaculty);
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження списку груп');
    });
  }
  /** Get length all list of groups */
  getCountRecords(entity: string) {
    this.apiService.getCountRecords(entity).subscribe(result => {
      this.itemsCount = result.numberOfRecords;
    });
  }

  /** Open modal window for add new group */
  openAddGroupDialog(): void {
    const dialogData = new DialogData();
    dialogData.listSpeciality = this.listSpeciality;
    dialogData.listFaculty = this.listFaculty;
    dialogData.description = {
      title: 'Додати нову групу',
      action: 'Додати'
    };
    this.groupModalService.groupDialog(GroupAddEditDialogComponent, dialogData, (group: Group) => this.addGroup(group));
  }

  /** Add new group */
  addGroup(group: Group) {
    this.apiService.createEntity('Group', group).subscribe((result: Group[]) => {
      this.openSnackBar(`Групу ${group.group_name} успішно додано`);
      this.getCountRecords('group');
      const numberOfPages = this.paginator.getNumberOfPages();
      this.getListGroups( numberOfPages * this.pageSize);
    }, (error: any) => {
      if (error.error.response.includes('Duplicate')) {
        this.modalService.openErrorModal(`Група "${group.group_name}" вже існує`);
      }
    });
  }
  /** open modal window for confirm delete */
  openConfirmDialog(group: Group) {
    const message = `Підтвердіть видалення групи "${group.group_name}"`;
    this.modalService.openConfirmModal(message, () => this.delGroup(group));
  }

  /** Delete group */
  delGroup(group: Group) {
    this.apiService.delEntity('Group', group.group_id).subscribe((result: any) => {
      if (result) {
        this.openSnackBar(`Групу ${group.group_name} успішно виделено`);
        this.getCountRecords('group');
        this.getListGroups(this.pageSize * this.currentPage);
      }
    }, (error: any) => {
      if (error.error.response.includes('Cannot delete')) {
        this.modalService.openInfoModal('Неможливо видалити групу із студентами. Видаліть спочатку студентів даної групи');
      } else {
        this.modalService.openErrorModal('Помилка видалення');
      }
    });
  }

  /** Open modal window for edit group */
  openEditGroupDialog(group: Group): void {
    const dialogData = new DialogData();
    dialogData.group = group;
    dialogData.listSpeciality = this.listSpeciality;
    dialogData.listFaculty = this.listFaculty;
    dialogData.description = {
      title: 'Редагувати інформацію про групу',
      action: 'Зберегти зміни'
    };
    this.groupModalService.groupDialog(GroupAddEditDialogComponent, dialogData, (elem: Group) =>
      this.editGroup(elem));
  }

  /** Method for edit group */
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
      }
    }, (error: any) => {
      if (error.error.response.includes('Error when update')) {
        this.modalService.openInfoModal('Інформація про групу не змінювалися');
      } else {
        this.modalService.openErrorModal('Помилка оновлення');
      }
    });
  }

  /** Open modal window for check speciality */
  openCheckSpecialityDialog() {
    const dialogData = new DialogData();
    dialogData.listSpeciality = this.listSpeciality;
    dialogData.description = {
      title: 'Виберіть спеціальність',
      action: 'getGroupsBySpeciality'
    };
    this.groupModalService.groupDialog(GroupViewDialogComponent, dialogData,
      (result) => {
        this.getListGroupsByFeature(dialogData.description.action, result.id[0]);
        this.isCheckFaculty = false;
        this.isCheckSpeciality = true;
        this.feature = result.id[1];
      });
  }

  /** open modal window for check faculty */
  openCheckFacultyDialog() {
    const dialogData = new DialogData();
    dialogData.listFaculty = this.listFaculty;
    dialogData.description = {
      title: 'Виберіть факультет/інститут',
      action: 'getGroupsByFaculty'
    };
    this.groupModalService.groupDialog(GroupViewDialogComponent, dialogData,
      (result) => {
        this.getListGroupsByFeature(dialogData.description.action, result.id[0]);
        this.isCheckFaculty = true;
        this.isCheckSpeciality = false;
        this.feature = result.id[1];
      });
  }

  /** Get list groups by speciality or faculty */
  getListGroupsByFeature(action: string, id: number): void {
    this.apiService.getEntityByAction('Group', action, id).subscribe((result: any) => {
      if ('response' in result) {
        this.dataSource.data = [];
        this.modalService.openInfoModal('Групи відсутні');
      } else {
        this.dataSource.data = this.groupService.addPropertyToGroup(result, this.listSpeciality, this.listFaculty);
      }
      this.currentPage = 0;
    }, () => {
      this.modalService.openErrorModal('Неможливо відобразити дані');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  backToListGroup() {
    this.currentPage = 0;
    this.getCountRecords('group');
    this.getListGroups();
  }
}
