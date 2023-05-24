export interface IPaginationParams {
  page: number;
  per_page: number;
}

export interface IPageParams {
  page: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface IPaginationTableList<T> extends IPagination {
  list: T[];
}
