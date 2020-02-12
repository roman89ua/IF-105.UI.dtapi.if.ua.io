import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { Speciality } from '../entity.interface';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private serverData = null;
  constructor(private apiService: ApiService) { }

  getSpecialities() {
    if (!this.serverData) {
      return this.apiService.getEntity('Speciality')
        .pipe(
          tap(((data: Speciality[]) => this.serverData = data)
          )
        );
    } else { return of(this.serverData) };
  }
  checkForUniqueValue(controlValue, prop) {
    return this.getSpecialities()
      .pipe(
        map(
          (specialities: Array<Speciality>) => specialities.find(speciality => speciality[prop] === controlValue)),
        tap(data => data)
      );
  }
}
