import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private apiService: ApiService,) { }

  getListGroup(): Observable<any> {
    return this.apiService.getEntity('group');
  }

  getListTest(): Observable<any> {
    return this.apiService.getEntity('test');
  }

  getResultTestIdsByGroup(id_group: number): Observable<any> {
    return this.apiService.getResultTestIdsByGroup(id_group);
  }
}
