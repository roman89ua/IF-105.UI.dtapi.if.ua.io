import { Injectable } from '@angular/core';
import { Group, Speciality, Faculty } from '../../shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from '../../shared/services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  listGroups: Group[] = [];
  listSpeciality: Speciality[] = [];
  listFaculty: Faculty[] = [];
  constructor(private apiService: ApiService, private modalService: ModalService) { }

  getListSpeciality() {
    this.apiService
      .getEntity('Speciality')
      .subscribe((result: Speciality[]) => {
        this.listSpeciality = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
  }

  getNameSpeciality(id: number): string {
    let speciality = this.listSpeciality.find(({speciality_id}) => id === speciality_id);
    return speciality.speciality_name;
  }
  
  getListFaculty() {
    this.apiService.getEntity('Faculty')
      .subscribe((result: Faculty[]) => {
        this.listFaculty = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
  }

  getNameFaculty(id: number): string {
    let faculty = this.listFaculty.find(({faculty_id}) => id === faculty_id);
    return faculty.faculty_name;
  }
}
