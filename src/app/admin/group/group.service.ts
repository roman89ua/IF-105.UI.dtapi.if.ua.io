import { Injectable } from '@angular/core';
import { Speciality, Faculty } from '../../shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from '../../shared/services/modal.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private apiService: ApiService, private modalService: ModalService) { }

  getListSpeciality(): Observable<any> {
    return this.apiService.getEntity('speciality');
  }

  getNameSpeciality(id: number, list: Speciality[]): string {
    const speciality = list.find(({speciality_id}) => id === speciality_id);
    return speciality.speciality_name;
  }

  getListFaculty() {
    return this.apiService.getEntity('faculty');
  }

  getNameFaculty(id: number, list: Faculty[]): string {
    const faculty = list.find(({faculty_id}) => id === faculty_id);
    return faculty.faculty_name;
  }
}
