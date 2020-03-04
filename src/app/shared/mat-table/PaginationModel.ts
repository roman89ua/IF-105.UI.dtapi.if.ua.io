import { PageEvent } from '@angular/material';
import { ApiService } from '../services/api.service';

export class PaginationModel {

    constructor(
        // tslint:disable-next-line:variable-name
        private _entity: string,
        public apiService: ApiService,
        private _pageSize: number = 10,
        private _pageIndex: number = 0) {
    }
    get pageIndex(): number {
        return this._pageIndex;
    }
    get pageSize(): number {
        return this._pageSize;
    }
    get entity(): string {
        return this._entity;
    }
    set pageIndex(val: number) {
        this._pageIndex = val;
    }
    set pageSize(val: number) {
        this._pageSize = val;
    }
     // tslint:disable-next-line:adjacent-overload-signatures
    set setEntity(entity: string) {
        this._entity = entity;
    }
    getRange(callback) {
        this.apiService.getRecordsRange(this._entity, this._pageSize, this._pageIndex * this._pageSize)
            .subscribe(data => callback(data));
    }
    getCountRecords(callback) {
        this.apiService.getCountRecords(this._entity)
            .subscribe(data => callback(data));
    }
    getEntity(callback) {
        this.apiService.getEntity(this._entity)
        .subscribe(data => callback(data));
    }
    pageChange(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
    }
}
