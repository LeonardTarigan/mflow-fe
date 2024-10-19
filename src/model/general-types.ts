export interface IGeneralFilter {
  search?: string;
  page?: number;
}

export interface IPagination {
  prev: number | null;
  next: number | null;
  current: number;
  total: number;
}

export interface IResponse<T> {
  data: T;
  pagination?: IPagination;
}
