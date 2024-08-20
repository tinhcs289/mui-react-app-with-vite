"use client";

import { styled } from "@mui/material";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import TableCell, {
  TableCellProps,
  tableCellClasses,
} from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import TableContainer from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";

export const DefaultComponents = {
  // root
  TableContainer: styled(TableContainer)<TableContainerProps>({}),
  Table: styled(MuiTable)<TableProps>({}),
  // head
  TableHead: styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
    background: theme.palette.background.paper,
    [`.${tableCellClasses.root}`]: {
      fontWeight: 700,
      color: theme.palette.grey[900],
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      ":not(:last-child)": {
        position: "relative",
        ":after": {
          content: '""',
          display: "block",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 0,
          width: "1px",
          height: "80%",
          background: theme.palette.grey[400],
        },
      },
    },
  })),
  TableHeadRow: styled(MuiTableRow)<TableRowProps>({}),
  TableHeadCell: styled(TableCell)<TableCellProps>({}),
  // body
  TableBody: styled(MuiTableBody)<TableBodyProps>({}),
  TableBodyRow: styled(MuiTableRow)<TableRowProps>({}),
  TableBodyCell: styled(TableCell)<TableCellProps>({}),
};
