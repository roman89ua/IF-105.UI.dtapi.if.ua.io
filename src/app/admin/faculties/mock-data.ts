import { Faculty } from 'src/app/shared/entity.interface';

export const facultiesMock: Faculty[] = [
    {
        faculty_id: 1,
        faculty_name: 'PI-16',
        faculty_description: 'desc'
    },
    {
        faculty_id: 2,
        faculty_name: 'KI',
        faculty_description: 'obj'
    }
];
export const countRecordsMock = { numberOfRecords: 2 };

export const faculty: Faculty = {
    faculty_id: 3,
    faculty_name: 'Медицина',
    faculty_description: 'desc'
};
