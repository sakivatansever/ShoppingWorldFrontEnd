export interface IDataResult<T> {
  data: T;
  totalRecords: number;
  page: number;
  pageSize: number;
}