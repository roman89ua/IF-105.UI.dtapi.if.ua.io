import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { Speciality } from '../entity.interface';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private array = [];
  constructor(private apiService: ApiService, private http: HttpClient) { }

  getSpecialityNameArray() {
    this.apiService.getEntity('Speciality').subscribe(
      (data: Speciality[]) => { this.array = data.map(obj => { obj.speciality_name }) });
    return this.array;
  }
  getSpecialityCodeArray() {
    this.apiService.getEntity('Speciality').subscribe(
      (data: Speciality[]) => { this.array = data.map(obj => { obj.speciality_code }); });
    return this.array;
  }
}
