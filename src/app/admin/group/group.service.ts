import { Injectable } from '@angular/core';
import { Speciality, Faculty, Group } from '../../shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from '../../shared/services/modal.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private apiService: ApiService, private modalService: ModalService) { }

  getListGroup(pageSize: number, offset: number = 0): Observable<any> {
    return this.apiService.getRecordsRange('group', pageSize, offset);
  }

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

  addPropertyToGroup(listGroup: Group[], listSpeciality: Speciality[], listFaculty: Faculty[]): Group[] {
    return listGroup.map( item => {
      const speciality = listSpeciality.find(({speciality_id}) => item.speciality_id === speciality_id).speciality_name;
      const faculty = listFaculty.find(({faculty_id}) => item.faculty_id === faculty_id).faculty_name;
      return { ...item, speciality, faculty };
    });
  }

}
