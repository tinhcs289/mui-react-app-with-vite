import type { AnyObject } from "@/types";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import TableContainer from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import type { ComponentType } from "react";
import { TableVirtuoso } from "react-virtuoso";

const TableContainerStyled = styled(TableContainer)<TableContainerProps>({});
const TableStyled = styled(MuiTable)<TableProps>({});
const TableHeadStyled = styled(MuiTableHead)<TableHeadProps>({});
const TableRowStyled = styled(MuiTableRow)<TableRowProps>({});
const TableBodyStyled = styled(MuiTableBody)<TableBodyProps>({});
const TableCellStyled = styled(TableCell)<TableCellProps>({});

export type TableComponent = typeof MuiTable | typeof TableStyled;

export type TableHeadComponent = typeof MuiTableHead | typeof TableHeadStyled;

export type TableBodyComponent = typeof MuiTableBody | typeof TableBodyStyled;

export type TableCellComponent =
  | ComponentType<TableCellProps>
  | typeof TableCellStyled;

export type TableRowComponent = typeof MuiTableRow | typeof TableRowStyled;

export type TableContainerComponent =
  | typeof TableContainer
  | typeof TableContainerStyled;

export type DefineHeadCellProps = (params: {
  columnIndex: number;
  field?: string;
  _key?: string;
}) => Partial<TableCellProps>;

export type DefineBodyCellProps<RowData extends AnyObject = AnyObject> =
  (params: {
    columnIndex: number;
    rowIndex: number;
    row: RowData;
    field?: string;
    _key?: string;
  }) => Partial<TableCellProps>;

export type DefineBodyRowProps<RowData extends AnyObject = AnyObject> =
  (params: { rowIndex: number; row: RowData }) => Partial<TableRowProps>;

export type ColumnDef<RowData extends AnyObject = AnyObject> = {
  _key: string;
  head?: string;
  field?: string;
  slots?: {
    Head?: TableCellComponent;
    Cell?: TableCellComponent;
  };
  slotProps?: {
    head?: Partial<TableCellProps> | DefineHeadCellProps;
    cell?: Partial<TableCellProps> | DefineBodyCellProps<RowData>;
  };
  hide?: boolean;
  resizable?: boolean;
  stickyFirst?: boolean;
  stickyLast?: boolean;
};

export type TableCommonStates<RowData extends AnyObject = AnyObject> = {
  colDefs: ColumnDef<RowData>[];
};

export type TableCommonProps<RowData extends AnyObject = AnyObject> = Omit<
  BoxProps,
  "slots"
> & {
  data?: RowData[];
  columns?: ColumnDef[];
  slots?: {
    HeaderRow?: TableRowComponent;
    BodyRow?: TableRowComponent;
    Container?: TableContainerComponent;
    Table?: TableComponent;
    TableHead?: TableHeadComponent;
    TableBody?: TableBodyComponent;
  };
  slotProps?: {
    virtuoso?: Partial<Parameters<typeof TableVirtuoso<RowData>>[0]>;
    headerRow?: Partial<TableRowProps>;
    bodyRow?: Partial<TableRowProps> | DefineBodyRowProps<RowData>;
    container?: Partial<TableContainerProps>;
    table?: Partial<TableProps>;
    tableHead?: Partial<TableHeadProps>;
    tableBody?: Partial<TableBodyProps>;
  };
};
