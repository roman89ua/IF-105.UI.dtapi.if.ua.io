import { Injectable } from '@angular/core';
import { PaginationModel } from './PaganationModel';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material';

@Injectable()
export class PaginatorService {
    constructor(private apiService: ApiService) {}
    getRange(entity: string, paginator: PaginationModel) {
        return this.apiService.getRecordsRange(entity, paginator.pageSize, paginator.pageIndex * paginator.pageSize);
    }
    getCountRecords(entity) {
        return this.apiService.getCountRecords(entity);
    }
}
