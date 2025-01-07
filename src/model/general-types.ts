export interface IGeneralFilter {
  search?: string;
  page: number;
}

export interface IPaginationi {
  prev: number | null;
  next: number | null;
  current: number;
  total: number;
}

export interface IPagination {
  previousPage: number | null;
  nextPage: number | null;
  currentPage: number;
  totalData: number;
  totalPage: number;
}

export interface IResponse<T> {
  data?: T;
  meta?: IPagination;
  error?: string;
  // TODO remove this later
  pagination?: IPaginationi;
}
