import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Faculty } from 'src/app/shared/entity.interface';
import * as FacultyAction from '../faculty/faculty-actions';

export interface FacultyState extends EntityState<Faculty> {
    allFacultiesLoaded: boolean;
}

export const adapter = createEntityAdapter<Faculty>({
    selectId: faculty => faculty.faculty_id,
});

export  const initialFacultiesState = adapter.getInitialState({
    allFacultiesLoaded: false
});

export const facultiesReducer = createReducer(
    initialFacultiesState,
    on(FacultyAction.allFacultiesLoaded, (state, action) => adapter.addAll(action.faculties, {...state, allFacultiesLoaded: true}) ),

    on(FacultyAction.facultyUpdate, (state, action) =>
    adapter.updateOne(action.update, state)),

    on(FacultyAction.facultyCreate, (state, action) => adapter.addOne(action.create,state)),

    on(FacultyAction.facultyDelete, (state, action) => adapter.removeOne(action.id,state))
);


export const { selectAll } = adapter.getSelectors();
