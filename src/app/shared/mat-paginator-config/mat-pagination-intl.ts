import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export function getMatPaginatorUkr(translate: TranslateService) {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = translate.instant('shared.matPagination.itemsPerPage');
  paginatorIntl.firstPageLabel = translate.instant('shared.matPagination.firstPage');
  paginatorIntl.previousPageLabel = translate.instant('shared.matPagination.pageBefore');
  paginatorIntl.nextPageLabel = translate.instant('shared.matPagination.nextPage');
  paginatorIntl.lastPageLabel = translate.instant('shared.matPagination.lastPage');
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    const endPage = (() => {
      if ((pageSize + (page * pageSize)) > length) {
        return length;
      } else { return pageSize + (page * pageSize); }
    })();
    return `${(page * pageSize) + 1} - ${endPage} із ${length}`;
  };

  return paginatorIntl;
}
