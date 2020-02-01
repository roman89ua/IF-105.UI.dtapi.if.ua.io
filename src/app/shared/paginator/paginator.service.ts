import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { mergeMap } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';

@Injectable()
export class PaginatorService {
    constructor(private apiService: ApiService, private modalService: ModalService) {}

    getRange(entity: string, offset: number = 0, pageSize: number) {
      return  this.apiService.getRecordsRange(entity, pageSize, offset);
      }
      getCountRecords(entity: string) {
        return  this.apiService.getCountRecords(entity);
        }
}
