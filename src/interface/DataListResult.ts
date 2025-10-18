export interface IDataListResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}