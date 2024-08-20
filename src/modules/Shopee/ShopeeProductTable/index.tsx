import useWatchElementHeight from "@/hooks/common-hooks/useWatchElementHeight";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import DataGrid from "react-data-grid";
import type { DataGridProps } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { useGetPaginatedListState } from "../context";
import type { ShopeeProductItem } from "@/mock/shopee/types";
import { useTheme } from "@mui/material";
import numeral from "numeral";
import toAbbreviatedString from "@/helpers/string-helpers/toAbbreviatedString";

function rowKeyGetter(row: ShopeeProductItem) {
  return row.itemid;
}

const columns: Required<
  DataGridProps<ShopeeProductItem, unknown, number>
>["columns"] = [
  { key: "itemid", name: "Mã" },
  { key: "name", name: "Sản phẩm", width: 400 },
  {
    key: "price",
    name: "Giá",
    renderCell: ({ row }) => (
      <Box textAlign="right">
        {numeral((row?.price || 0) / 100000).format("0,0[.]00$")}
      </Box>
    ),
  },
  {
    key: "historical_sold",
    name: "Đã bán",
    renderCell: ({ row }) => (
      <Box textAlign="right">
        {!row?.historical_sold
          ? ""
          : toAbbreviatedString({
              from: row.historical_sold,
              units: ["N", "Tr", "T", "Nt"],
              toFix: 1,
            })}
      </Box>
    ),
  },
];

export default function ShopeeProductTable() {
  const data = useGetPaginatedListState((s) => s?.itemsInPage);
  const rows = useMemo(() => data || [], [data]);

  const [rootRef, rootHeight] = useWatchElementHeight<HTMLDivElement>();
  const theme = useTheme();

  const mode = useMemo(() => theme.palette.mode, [theme?.palette?.mode]);

  return (
    <Box sx={{ height: "calc(100% - 100px)" }} ref={rootRef}>
      <DataGrid<ShopeeProductItem, unknown, number>
        rowKeyGetter={rowKeyGetter}
        rows={rows}
        columns={columns}
        style={{ height: `${rootHeight}px` }}
        className={`rdg-${mode}`}
      />
    </Box>
  );
}
