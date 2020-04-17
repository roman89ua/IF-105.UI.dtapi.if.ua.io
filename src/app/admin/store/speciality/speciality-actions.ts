import { createAction, props } from '@ngrx/store';
import { Speciality } from 'src/app/shared/entity.interface';



export const allSpecialitiesLoaded = createAction(
    '[Load Specialities Effect] All Specialities Loaded',
    props<{ specialities: Speciality[] }>()
);

// export const facultyUpdate = createAction(
//     '[Edit Faculty Dialog] Faculty Updated',
//     props<{ update: Update<Faculty> }>()
// );

// export const facultyCreate = createAction(
//     '[Create Faculty Dialog] Faculty Create',
//     props<{create: Faculty}>()
// )
// export const facultyDelete = createAction(
//     '[Delete Faculty Dialog] Faculty Delete',
//     props<{id: number}>()
// )