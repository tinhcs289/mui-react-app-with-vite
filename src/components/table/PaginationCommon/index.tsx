import type { Theme } from "@mui/material";
import { styled, useMediaQuery } from "@mui/material";
import type { PaginationProps } from "@mui/material/Pagination";
import Pagination from "@mui/material/Pagination";
import type { ChangeEvent } from "react";
import { forwardRef, useCallback, useMemo } from "react";

const PaginationStyled = styled(Pagination)<PaginationProps>({
  display: "flex",
  justifyContent: "center",
});

export type PaginationCommonProps = Omit<
  PaginationProps,
  "onChange" | "count"
> & {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number) => void;
  loading?: boolean;
};

const PaginationCommon = forwardRef<HTMLElement, PaginationCommonProps>(
  (
    {
      pageIndex = 1,
      pageSize = 10,
      totalCount = 0,
      onChange,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      loading = false,
      ...otherProps
    },
    ref
  ) => {
    const isSmallScreenOrLower = useMediaQuery((theme: Theme) =>
      theme?.breakpoints?.down?.("sm")
    );

    const totalPages = useMemo(() => {
      return Math.ceil(totalCount / pageSize);
    }, [totalCount, pageSize]);

    const handleChange = useCallback(
      (event: ChangeEvent<unknown>, page: number) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        onChange?.(page);
      },
      [onChange]
    );

    const propsByScreen = useMemo(() => {
      if (!isSmallScreenOrLower) return { boundaryCount: 2, siblingCount: 3 };
      return { boundaryCount: 1, siblingCount: 0 };
    }, [isSmallScreenOrLower]);

    return (
      <PaginationStyled
        showFirstButton
        showLastButton
        color="primary"
        shape="rounded"
        {...otherProps}
        onChange={handleChange}
        count={totalPages}
        page={pageIndex}
        ref={ref}
        {...propsByScreen}
      />
    );
  }
);

PaginationCommon.displayName = "PaginationCommon";
export default PaginationCommon;
