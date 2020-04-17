import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Faculty } from 'src/app/shared/entity.interface';
import { ModalService } from '../../shared/services/modal.service';
import { FacultiesService } from './faculties.service';
import { Column, tableActionsType } from 'src/app/shared/mat-table/mat-table.interface';
import { MatTableComponent } from 'src/app/shared/mat-table/mat-table.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { loadAllFaculties, facultyUpdate, facultyDelete, facultyCreate } from '../store/faculty/faculty-actions';
import { selectAllFaculties, areFacultiesLoaded } from '../store/faculty/faculty-selectors';
import { take, tap } from 'rxjs/operators';
import { selectAll } from '../store/faculty/faculty-reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent  implements OnInit, AfterViewInit {

  /* TABLE  */
  faculties$: Observable<Faculty[]>;
  faculties: Faculty[] = [];
  length: number;

  @ViewChild(MatTableComponent) mattable: MatTableComponent;

  columns: Column [] = [
    {columnDef: 'faculty_id', header: 'ID'},
    {columnDef: 'faculty_name', header: 'Факультети'},
    {columnDef: 'faculty_description', header: 'Опис'},
    {columnDef: 'action', header: 'Дії', actions: [
      {type: tableActionsType.Edit, icon: 'edit', matTooltip: 'Редагувати', aria_label: 'edit'},
      {type: tableActionsType.Remove, icon: 'delete', matTooltip: 'Видалити', aria_label: 'delete'}
    ]}
  ];

  actions = {
    edit: (faculty) => {
      this.openFacultyModal(faculty);
    },
    remove: (faculty) => {
      this.openConfirmDialog(faculty);
    }

  };


  constructor(
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private facultyService: FacultiesService,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.pipe(
      select(areFacultiesLoaded),
      tap((hasLoaded) => {
        if (!hasLoaded) {
          this.store.dispatch(loadAllFaculties())
        }
      })
    ).subscribe();


   this.faculties$ = this.store.pipe(select(selectAllFaculties))
  }

  pageUpdate() {
    // this.mattable.getRange((data: Faculty[]) => this.faculties = data);
    // this.mattable.getCountRecords(response => this.length = response.numberOfRecords);
  }

  ngAfterViewInit(): void {
    // this.mattable.getRange((data: Faculty[]) => this.faculties = data);
    // this.mattable.getCountRecords(response => this.length = response.numberOfRecords);
  }

  getAction({type, body}: {type: tableActionsType, body: Faculty} ) {
    this.actions[type](body);
  }


  openFacultyModal(facultyObj?: Faculty) {
    if (!facultyObj) {
      this.facultyService.openAddFacultyDialog()
        .subscribe((dialogResult: Faculty) => {
          if (dialogResult) {
          this.createFaculty(dialogResult);
          }});
    } else {
      this.facultyService.openAddFacultyDialog(facultyObj)
        .subscribe((dialogResult: Faculty) => {
          if (dialogResult) {
            this.updateFaculty(facultyObj.faculty_id, dialogResult);
          }
        });
    }
  }

  createFaculty(faculty: Faculty) {
    this.facultyService.createFaculty(faculty)
      .subscribe(() => {
        this.store.dispatch(facultyCreate({create: faculty}));
        // this.mattable.getRange(data => this.faculties = data);
        // this.length++;
        this.openSnackBar('Факультет додано');
      },
        err => {
          if (err.error.response.includes('Duplicate')) {
            this.modalService.openErrorModal(`Факультети "${faculty.faculty_name}" вже існує`);
          }
        }
      );
  }


  updateFaculty(id: number, faculty: Faculty) {
  //  const [...newArray] = this.faculties;
   this.store.dispatch(facultyUpdate({
     update: {
       id,
       changes: faculty
     }
   }))
  //  this.facultyService.updateFaculty(id, faculty)
  //     .subscribe((response: Faculty[]) => {
  //       this.openSnackBar('Факультет оновлено');
  //       // newArray[newArray.findIndex(el => el.faculty_id === id)] = {
  //       //   ...response[0]
  //       // };
  //       // this.faculties = newArray;
  //     },
  //       err => {
  //         if (err.error.response.includes('Error when update')) {
  //           this.openSnackBar('Інформація про факультет не змінювалась');
  //         }
  //       }
  //     );
  }

  openConfirmDialog(faculty: Faculty) {
    const message = `Підтвердіть видалення факультету "${faculty.faculty_name}"?`;
    this.modalService.openConfirmModal(message, () => this.removeFaculty(faculty.faculty_id));
  }


  removeFaculty(id: number) {
    this.facultyService.deleteFaculty(id)
      .subscribe(() => {
        this.store.dispatch(facultyDelete({id}));
      //  this.faculties = this.faculties.filter(item => item.faculty_id !== id);
       this.openSnackBar('Факультет видалено');
      //  if (this.faculties.length > 0) { this.length--; }
      },
        err => {
          if (err.error.response.includes('Cannot delete')) {
            this.modalService.openInfoModal('Неможливо видалити факультет. Потрібно видалити групу цього факультету');
          } else {
            this.modalService.openErrorModal('Помилка видалення');
          }
        });
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
