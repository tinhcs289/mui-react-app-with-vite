import newGuid from "@/helpers/string-helpers/newGuid";
import type { AnyObject } from "@/types";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import TableContainer from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import get from "lodash/get";
import type { ForwardedRef, Ref } from "react";
import { forwardRef } from "react";
import type { TableComponents } from "react-virtuoso";
import { TableVirtuoso } from "react-virtuoso";
import { ColDefsInit, StatesProvider, useGetState } from "./context";
import type {
  ColumnDef,
  DefineBodyRowProps,
  TableBodyComponent,
  TableCommonProps,
  TableComponent,
  TableContainerComponent,
  TableHeadComponent,
  TableRowComponent,
} from "./types";

export function createColumn<RowData extends AnyObject = AnyObject>(
  colDef: Omit<ColumnDef<RowData>, "_key">
) {
  return { ...colDef, _key: newGuid() } as ColumnDef<RowData>;
}

function createVirtuosoComponents<RowData extends AnyObject = AnyObject>({
  slots = {},
  slotProps = {},
}: {
  slots?: {
    Container?: TableContainerComponent;
    Table?: TableComponent;
    TableHead?: TableHeadComponent;
    TableRow?: TableRowComponent;
    TableBody?: TableBodyComponent;
  };
  slotProps?: {
    container?: Partial<TableContainerProps>;
    table?: Partial<TableProps>;
    tableHead?: Partial<TableHeadProps>;
    tableRow?: Partial<TableRowProps> | DefineBodyRowProps<RowData>;
    tableBody?: Partial<TableBodyProps>;
  };
}) {
  const {
    Container = TableContainer,
    Table = MuiTable,
    TableHead = MuiTableHead,
    TableRow = MuiTableRow,
    TableBody = MuiTableBody,
  } = slots;

  const {
    container: containerProps,
    table: tableProps,
    tableHead: tableHeadProps,
    tableBody: tableBodyProps,
    tableRow: tableRowProps,
  } = slotProps;

  const components: TableComponents<RowData> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <Container component={Paper} {...props} ref={ref} {...containerProps} />
    )),
    Table: forwardRef((props, ref) => (
      <Table
        {...props}
        {...tableProps}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          ...tableProps?.sx,
        }}
        ref={ref as any}
      />
    )),
    TableHead: forwardRef((props, ref) => (
      <TableHead {...props} ref={ref as any} {...tableHeadProps} />
    )),
    TableRow: forwardRef(({ item, ...props }, ref) => {
      let customProps = {};
      if (typeof tableRowProps === "object") customProps = tableRowProps;
      if (typeof tableRowProps === "function")
        customProps = tableRowProps({
          row: item,
          rowIndex: +props["data-index"],
        });
      return <TableRow ref={ref as any} {...customProps} {...props} />;
    }),
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} {...tableBodyProps} />
    )),
  };
  return components;
}

function HeaderContent({
  Component = MuiTableRow,
  props,
}: {
  Component?: TableRowComponent;
  props?: Partial<TableRowProps>;
}) {
  const colDefs = useGetState((s) => s?.colDefs);
  return (
    <Component {...props}>
      {colDefs?.map?.(
        ({ _key, field, head, slots = {}, slotProps = {} }, i) => {
          const inner = head || null;
          const Cell = slots.Head || TableCell;
          const cellProps =
            typeof slotProps.head === "function"
              ? slotProps.head({
                  columnIndex: i,
                  _key,
                  field,
                })
              : slotProps.cell || {};
          return (
            <Cell key={_key} variant="head" {...cellProps}>
              {inner}
            </Cell>
          );
        }
      )}
    </Component>
  );
}

function RowCells<RowData extends AnyObject = AnyObject>({
  rowIndex,
  row,
}: {
  rowIndex: number;
  row: RowData;
}) {
  const colDefs = useGetState((s) => s?.colDefs);
  return (
    <>
      {colDefs?.map?.(({ _key, field, slots = {}, slotProps = {} }, i) => {
        const inner = !field ? null : (get(row, field, null) as string | null);
        const Cell = slots.Cell || TableCell;
        const cellProps =
          typeof slotProps.cell === "function"
            ? slotProps.cell({
                columnIndex: i,
                row,
                rowIndex,
                _key,
                field,
              })
            : slotProps.cell || {};
        return (
          <Cell key={_key} {...cellProps}>
            {inner}
          </Cell>
        );
      })}
    </>
  );
}

function createHeaderComponent({
  Component = MuiTableRow,
  props,
}: {
  Component?: TableRowComponent;
  props?: Partial<TableRowProps>;
}) {
  return function fixedHeaderContent() {
    return <HeaderContent Component={Component} props={props} />;
  };
}

function itemContent(rowIndex: number, row: AnyObject) {
  return <RowCells rowIndex={rowIndex} row={row} />;
}

const BoxTableRoot = styled(Box)<BoxProps>({
  width: "100%",
});

const TableCommon = forwardRef(
  <RowData extends AnyObject = AnyObject>(
    {
      columns,
      data = [],
      height = "500px",
      slots = {},
      slotProps = {},
      ...props
    }: TableCommonProps<RowData>,
    ref?: Ref<HTMLDivElement>
  ) => {
    const { HeaderRow, Container, BodyRow, Table, TableBody, TableHead } =
      slots;
    const {
      headerRow: headerRowProps,
      virtuoso: virtuosoProps,
      bodyRow,
      container: containerProps,
      table: tableProps,
      tableBody: tableBodyProps,
      tableHead: tableHeadProps,
    } = slotProps;

    const components = createVirtuosoComponents<RowData>({
      slots: {
        Container,
        Table,
        TableBody,
        TableHead,
        TableRow: BodyRow,
      },
      slotProps: {
        container: containerProps,
        table: tableProps,
        tableBody: tableBodyProps,
        tableHead: tableHeadProps,
        tableRow: bodyRow,
      },
    });

    const fixedHeaderContent = createHeaderComponent({
      Component: HeaderRow,
      props: headerRowProps,
    });

    return (
      <StatesProvider>
        <ColDefsInit columns={columns} />
        <BoxTableRoot ref={ref} component={Paper} height={height} {...props}>
          <TableVirtuoso
            data={data}
            components={components}
            itemContent={itemContent}
            fixedHeaderContent={fixedHeaderContent}
            {...virtuosoProps}
          />
        </BoxTableRoot>
      </StatesProvider>
    );
  }
) as <RowData extends AnyObject = AnyObject>(
  props: TableCommonProps<RowData> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element;

// @ts-ignore
TableCommon.displayName = "TableCommon";
export default TableCommon;
