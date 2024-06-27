export type GetPaginatedListReturns<T> = {
  totalCount: number;
  result: T[];
};

export type SortDirection = "asc" | "desc";
export type SortBy = {
  by: string;
  direction: SortDirection;
};

export type GetPaginatedListParams = {
  keyword?: string;
  pageIndex: number;
  pageSize: number;
  order?: SortBy[];
  query?: {
    [x: string]: any;
  };
};
