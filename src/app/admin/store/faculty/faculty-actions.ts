
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Faculty } from 'src/app/shared/entity.interface';

export const loadAllFaculties = createAction(
    '[Faculty page] Load All Faculties'
);

export const allFacultiesLoaded = createAction(
    '[Load Faculties Effect] All Faculties Loaded',
    props<{ faculties: Faculty[] }>()
);

export const facultyUpdate = createAction(
    '[Edit Faculty Dialog] Faculty Updated',
    props<{ update: Update<Faculty> }>()
);

export const facultyCreate = createAction(
    '[Create Faculty Dialog] Faculty Create',
    props<{create: Faculty}>()
)
export const facultyDelete = createAction(
    '[Delete Faculty Dialog] Faculty Delete',
    props<{id: number}>()
)
