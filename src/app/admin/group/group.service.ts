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

  getNameSpeciality(speciality_id: number): string {
    for (let item of this.listSpeciality) {
      if (item.speciality_id == speciality_id) {
        return item.speciality_name;
      }
    }
  }
  
  getListFaculty() {
    this.apiService.getEntity('Faculty')
      .subscribe((result: Faculty[]) => {
        this.listFaculty = result;
      }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
      });
  }

  getNameFaculty(faculty_id: number): string {
    for (let item of this.listFaculty) {
      if (item.faculty_id == faculty_id) {
        return item.faculty_name;
      }
    }
  }
}
