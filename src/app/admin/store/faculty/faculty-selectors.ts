import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from '../MainReducer';
import { FacultyState, selectAll } from './faculty-reducers';


export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectFacultyState = createSelector(
    selectAdminState,
    state => state.faculty
)
export const selectAllFaculties = createSelector(
    selectFacultyState,
    selectAll
)

export const areFacultiesLoaded = createSelector(
    selectFacultyState,
    state => state.allFacultiesLoaded
);