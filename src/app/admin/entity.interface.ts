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
export interface Subject {
  subject_id: number;
  subject_name: string;
  subject_description: string;
}

export interface DialogData {
    data: any;
}

export interface Test {
  test_id: number;
  test_name: string;
  subject_id: number;
  tasks: number;
  time_for_test: number;
  enabled: boolean;
  attempts: number;
}

export interface Subject {
  subject_id: number;
  subject_name: string;
  subject_description: string;
}
