import { Injectable } from '@angular/core';
import { PaginationModel } from './PaganationModel';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material';

@Injectable()
export class PaginatorService {

    constructor(private apiService: ApiService) {}

    getRange(entity: string, pageSize, pageIndex) {
        return this.apiService.getRecordsRange(entity, pageSize, pageIndex * pageSize);
    }
    getCountRecords(entity: string) {
        return this.apiService.getCountRecords(entity);
    }
}
