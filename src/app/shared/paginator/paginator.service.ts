import { Injectable } from '@angular/core';
import { PaginationModel } from './PaganationModel';
import { ApiService } from '../services/api.service';
import { Pagination } from './PaginationInterface';

@Injectable()
export class PaginatorService {

    private paginationModel: PaginationModel;

    get page(): number {
        return this.paginationModel.pageIndex;
    }
    get selectItemsPerPage(): number[] {
        return this.paginationModel.selectItemsPerPage;
    }
    get pageCount(): number {
        return this.paginationModel.pageSize;
    }
    constructor(private apiService: ApiService) {
        this.paginationModel = new PaginationModel();
    }

    change(value: Pagination) {
        this.paginationModel.pageIndex = value.pageIndex;
        this.paginationModel.pageSize = value.pageSize;
        this.paginationModel.allItemsLength = value.length;
        this.paginationModel.offset = value.offset;
    }

    getRange(entity) {
        return this.apiService.getRecordsRange(entity, this.paginationModel.pageSize, this.paginationModel.offset);
    }
    getCountRecords(entity) {
        return this.apiService.getCountRecords(entity);
    }

    resetPaginator() {
        this.paginationModel = new PaginationModel();
    }
}
