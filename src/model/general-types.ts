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
  data?: T;
  meta?: IPagination;
  error?: string;
  // TODO remove this later
  pagination?: IPagination;
}
