import {
    ActionReducerMap,
} from '@ngrx/store';
import * as fromFaculty  from '../faculty/faculty-reducers';
import * as fromSpeciality from '../speciality/speciality-reducer';



export const initialAdminState: AdminState = {
    faculty: fromFaculty.initialFacultiesState,
    speciality: fromSpeciality.initialSpecialityState
};

export interface AdminState {
    faculty: fromFaculty.FacultyState;
    speciality: fromSpeciality.SpecialityState

}

export const reducers: ActionReducerMap<AdminState> = {
    faculty: fromFaculty.facultiesReducer,
    speciality: fromSpeciality.specialityReducer

}

