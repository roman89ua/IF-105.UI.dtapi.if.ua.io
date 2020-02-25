import { PageEvent } from '@angular/material';
import { ApiService } from '../services/api.service';

export class PaginationModel {

    // tslint:disable-next-line:variable-name
    private _entity: string;
    constructor(
        private apiService: ApiService,
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
    // tslint:disable-next-line:adjacent-overload-signatures
    set pageIndex(val: number) {
        this._pageIndex = val;
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
    pageChange(event: PageEvent) {
        this._pageSize = event.pageSize;
        this._pageIndex = event.pageIndex;
    }
}
