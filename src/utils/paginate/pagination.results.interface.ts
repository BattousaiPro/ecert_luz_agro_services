export interface PaginationResultInterface<PaginationEntity> {
    results: PaginationEntity[];
    totalReg: number;
    nextPage?: number;
    previousPage?: number;
  }