import PaginationCommon from "@/components/table/PaginationCommon";
import { useGetPaginatedListState } from "@/modules/Shopee/context";
import { useCallback } from "react";

export default function ShopeeProductListPaging() {
  const isLoading = useGetPaginatedListState(
    (s) => s?.requestState === "fetching"
  );
  const pageIndex = useGetPaginatedListState((s) => s?.pageIndex || 1);
  const pageSize = useGetPaginatedListState((s) => s?.pageSize || 60);
  const totalCount = useGetPaginatedListState((s) => s?.totalCount || 0);
  const updatePaging = useGetPaginatedListState((s) => s.updatePaging);

  const handleChangePage = useCallback(
    (page: number) => {
      updatePaging?.(page, 60);
    },
    [updatePaging]
  );
  return (
    <PaginationCommon
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
      onChange={handleChangePage}
      disabled={isLoading}
      sx={{ py: 1 }}
    />
  );
}
