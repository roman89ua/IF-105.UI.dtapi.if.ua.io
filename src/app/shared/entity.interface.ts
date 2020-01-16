export interface Group {
  group_id: number;
  group_name: string;
  speciality_id: number;
  faculty_id: number;
}

export interface Speciality {
  speciality_id: number;
  speciality_code: string;
  speciality_name: string;
}

export interface Faculty {
  faculty_id: number;
  faculty_name: string;
  faculty_description: string;
}

export interface DialogData {
    data: any;
  }

export interface TimeTable {
  timetable_id?: number;
  group_name: string;
  start_date: number;
  start_time: number;

}
