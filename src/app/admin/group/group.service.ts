import { Injectable } from '@angular/core';
import { Group, Speciality, Faculty } from '../../shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from '../../shared/services/modal.service';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  listGroups: Group[] = [];
  listSpeciality: Speciality[] = [];
  listFaculty: Faculty[] = [];
  isListSpesialityLoaded = false;
  isListFacultyLoaded = false;

  constructor(private apiService: ApiService, private modalService: ModalService) { }

  getListSpeciality(): Observable<any> {
    return this.isListSpesialityLoaded ? of(this.listSpeciality) : this.apiService.getEntity('speciality')
      .pipe(tap(() => {this.isListSpesialityLoaded = true}));
  }

  getNameSpeciality(id: number): string {
    let speciality = this.listSpeciality.find(({speciality_id}) => id === speciality_id);
    return speciality.speciality_name;
  }
  
  getListFaculty() {
    return this.isListFacultyLoaded ? of(this.listFaculty) : this.apiService.getEntity('faculty')
      .pipe(tap(() => {this.isListFacultyLoaded = true}));

  }

  getNameFaculty(id: number): string {
    let faculty = this.listFaculty.find(({faculty_id}) => id === faculty_id);
    return faculty.faculty_name;
  }
}
