import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Group } from '../../shared/entity.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalService } from '../../shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { GroupModalService } from '../group/group-modal.service';
import { DialogData } from './group-modal.interface';
import { GroupService } from './group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, AfterViewInit {
  listGroups: Group[] = [];
  dataSource = new MatTableDataSource<Group>();
  displayedColumns: string[] = [
    'id',
    'name',
    'speciality',
    'faculty',
    'students',
    'actions'
  ];
  /** properties for pagination */
  itemsCount: number;
  pageSize: number = 10;
  currentPage: number = 0;
  /** properties for get group for features */
  isCheckSpeciality: boolean = false;
  isCheckFaculty: boolean = false;
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
    private _snackBar: MatSnackBar,
    private groupModalService: GroupModalService,
    private groupService: GroupService
    ) { }

  ngOnInit() {
    this.getCountRecords('group');
    this.groupService.getListSpeciality();
    this.groupService.getListFaculty();
    this.getListGroups();
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

  getListGroups(offset: number = 0) {
    this.apiService.getRecordsRange('group', this.pageSize, offset).subscribe((result: Group[]) => {
      this.isCheckFaculty = false;
      this.isCheckSpeciality = false;
      this.listGroups = result;
      this.dataSource.data = this.listGroups;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження списку груп');
    });
  }

  getCountRecords(entity: string) {
    this.apiService.getCountRecords(entity).subscribe(result => {
      this.itemsCount = result.numberOfRecords;
    });
  }

  /** Open modal window for add new group */
  openAddGroupDialog(): void {
    let dialogData = new DialogData();
    dialogData.group = null;
    dialogData.description = {
      title: 'Додати нову групу',
      action: 'Додати'
    };
    this.groupModalService.addGroupDialog(dialogData, (group) => this.addGroup(group));
  }

  /** Add new group */
  addGroup(group: Group) {
    this.apiService.createEntity('Group', group).subscribe((result: Group[]) => {
      this.openSnackBar(`Групу ${group.group_name} успішно додано`);
      this.getCountRecords('group');
      let numberOfPages = this.paginator.getNumberOfPages();
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
      }
      else {
        this.modalService.openErrorModal('Помилка видалення');
      }
    });
  }

  /** Open modal window for edit group */
  openEditGroupDialog(group: Group): void {
    let dialogData = new DialogData();
    dialogData.group = group;
    dialogData.description = {
      title: 'Редагувати інформацію про групу',
      action: 'Зберегти зміни'
    };
      this.groupModalService.editGroupDialog(dialogData, (group) => this.editGroup(group));
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
      }
      else {
        this.modalService.openErrorModal('Помилка оновлення');
      }
    });
  }

  /** Open modal window for check speciality */ 
  openCheckSpecialityDialog() {
    let dialogData = new DialogData();
    dialogData.description = {
      title: 'Виберіть спеціальність',
      action: 'getGroupsBySpeciality'
    };
    this.groupModalService.viewGroupFeatureDialog(dialogData, 
      (result) => {
        this.getListGroupsByFeature(dialogData.description.action, result.id[0]);
        this.isCheckFaculty = false;
        this.isCheckSpeciality = true;
        this.feature = result.id[1];
      });
  }

  /** open modal window for check faculty */
  openCheckFacultyDialog() {
    let dialogData = new DialogData();
    dialogData.description = {
      title: 'Виберіть факультет/інститут',
      action: 'getGroupsByFaculty'
    };
    this.groupModalService.viewGroupFeatureDialog(dialogData, 
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
      if (result.response) {
        this.dataSource.data = [];
        this.modalService.openInfoModal('Групи відсутні');
      } else {
        this.dataSource.data = result;
      }
      this.currentPage = 0;
    }, () => {
      this.modalService.openErrorModal('Неможливо відобразити дані');
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  backToListGroup() {
    this.currentPage = 0;
    this.getCountRecords('group');
    this.getListGroups();
  }
}
