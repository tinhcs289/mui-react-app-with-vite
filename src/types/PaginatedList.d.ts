import type { AnyObject } from "@/types/AnyObject";

export type SortDirection = "asc" | "desc";
export type PaginatedListData<Item extends AnyObject = AnyObject> = {
  totalCount: number;
  result: Item[];
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};
export type PaginatedListQuery<Filter extends AnyObject = AnyObject> = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  query?: Filter;
};
