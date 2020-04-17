import { AdminState } from '../MainReducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectSpecialityState = createSelector(
    selectAdminState,
    state => state.speciality
)

// export const selectSpecialities = createSelector(
//     selectSpecialityState,
//     state => state.specialities
// );