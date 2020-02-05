export class PaginationModel {
    private _pageSize: number;
    private _pageIndex: number;

    get pageIndex(): number {
        return this._pageIndex;
    }
    get pageSize(): number {
        return this._pageSize;
    }
    set pageIndex(val: number) {
        this._pageIndex = val;
    }
    constructor(pageSize: number, pageIndex: number) {
        this._pageSize = pageSize;
        this._pageIndex = pageIndex;
    }
}
