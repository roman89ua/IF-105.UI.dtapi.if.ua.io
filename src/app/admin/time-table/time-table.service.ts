import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export interface TimeTable {
  timetable_id?: number;
  group_id?: number;
  subject_id: number;
  start_date: number;
  start_time: number;
  end_date: number;
  end_time: number;

}

export class TimeTableService {

  constructor() {
  }

}
