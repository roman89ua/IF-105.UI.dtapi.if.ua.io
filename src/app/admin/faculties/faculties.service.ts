import { Injectable } from '@angular/core';
import { Faculty } from 'src/app/shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Injectable()
export class FacultiesService {
    private faculties: Faculty[] = [];
    constructor(private apiService: ApiService,  private modalService: ModalService) {}

    getFaculties(): Faculty[] {
        return this.faculties;
    }

    findAllFaculties() {
        this.apiService.getEntity('Faculty')
        .subscribe((response: Faculty[]) => {
            this.faculties = response;
        });
    }
    createFaculty(faculty: Faculty) {
        this.apiService.createEntity('Faculty', faculty)
          .subscribe(response => {
            this.faculties = [...this.faculties, response[0]];
          },
            err => {
              if (err.error.response.includes('Duplicate')) {
                this.modalService.openErrorModal(`Факультети "${faculty.faculty_name}" вже існує`);
              }
            }
          );
      }

}
