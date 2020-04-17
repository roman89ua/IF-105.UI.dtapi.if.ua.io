import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FacultyAction from '../faculty/faculty-actions';
import { ApiService } from 'src/app/shared/services/api.service';
import { concatMap, map, catchError, take, finalize, tap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FacultiesService } from '../../faculties/faculties.service';

@Injectable()
export class FacultyEffects {
    loadFaculties$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(FacultyAction.loadAllFaculties),
                concatMap(() => {
                   return this.apiService.getEntity('Faculty').pipe(
                        map(data => FacultyAction.allFacultiesLoaded({ faculties: data })),
                        catchError(() => EMPTY)
                        )}
                    ),

        );
    });

    saveFaculty$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(FacultyAction.facultyUpdate),
                concatMap((action) =>
                this.facultyService.updateFaculty(+action.update.id, action.update.changes)
                    .pipe(
                        tap(() => this.modalService.openSnackBar('Факультет оновлено')),
                        catchError((err) => {
                            if (err.error.response.includes('Error when update')) {
                                this.modalService.openSnackBar('Інформація про факультет не змінювалась');
                                return EMPTY;
                            }

                        })
                    )
                )
        )
    }, {dispatch: false});



    constructor(private actions$: Actions,
                private facultyService: FacultiesService,
                private modalService: ModalService,
                private apiService: ApiService) {
    }
}
