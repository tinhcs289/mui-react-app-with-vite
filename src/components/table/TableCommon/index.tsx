"use client";

import createStatesContext, {
  UseGetState,
  UseInitState,
  UseSetState,
} from "@/helpers/react-context-helpers/createStatesContext";
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
import get from "lodash/get";
import type { ComponentType, ForwardedRef, ReactNode, Ref } from "react";
import { forwardRef, memo } from "react";
import type { TableComponents } from "react-virtuoso";
import { TableVirtuoso } from "react-virtuoso";

const DefaultComponents = {
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

type VirtuosoProps<RowData extends AnyObject = AnyObject> = Parameters<
  typeof TableVirtuoso<RowData>
>[0];

// ========================

type TableContainerComponent = ComponentType<TableContainerProps<"div">>;

type TableComponent = ComponentType<TableProps<"table">>;

type TableHeadComponent = ComponentType<TableHeadProps<"thead">>;

type TableHeadRowComponent = ComponentType<TableRowProps<"tr">>;

type TableHeadCellComponent = ComponentType<TableCellProps>;

type TableBodyComponent = ComponentType<TableBodyProps<"tbody">>;

type TableBodyRowComponent = ComponentType<TableRowProps<"tr">>;

// ========================

type CustomTableBodyRowComponent<RowData extends AnyObject = AnyObject> =
  ComponentType<
    TableRowProps<"tr"> & {
      renderParams?: {
        rowInner?: ReactNode;
        rowIndex: number;
        row: RowData;
      };
    }
  >;

type CustomTableBodyCellComponent<RowData extends AnyObject = AnyObject> =
  ComponentType<
    TableCellProps & {
      renderParams?: {
        cellInner?: ReactNode;
        columnIndex: number;
        rowIndex: number;
        row: RowData;
        field?: string;
        _key?: string;
      };
    }
  >;

// ========================

type GetHeadCellProps = (params: {
  columnIndex: number;
  field?: string;
  _key?: string;
}) => Partial<TableCellProps>;

type GetBodyCellProps<RowData extends AnyObject = AnyObject> = (params: {
  columnIndex: number;
  rowIndex: number;
  row: RowData;
  field?: string;
  _key?: string;
}) => Partial<TableCellProps>;

type GetBodyCellContent<RowData extends AnyObject = AnyObject> = (params: {
  columnIndex: number;
  rowIndex: number;
  row: RowData;
  field?: string;
  _key?: string;
}) => ReactNode;

type GetBodyRowProps<RowData extends AnyObject = AnyObject> = (params: {
  rowIndex: number;
  row: RowData;
}) => Partial<TableRowProps>;

// ========================

type ColumnDef<RowData extends AnyObject = AnyObject> = {
  _key: string;
  field?: string;
  head?: string;
  renderContent?: GetBodyCellContent<RowData>;
  slots?: {
    Head?: TableHeadCellComponent;
    Cell?: CustomTableBodyCellComponent<RowData> | ComponentType<any>;
  };
  slotProps?: {
    head?: Partial<TableCellProps> | GetHeadCellProps;
    cell?: Partial<TableCellProps> | GetBodyCellProps<RowData>;
  };
  hide?: boolean;
  resizable?: boolean;
  sticky?: "start" | "end";
};

// ========================

type TableCommonStates<RowData extends AnyObject = AnyObject> = {
  colDefs: ColumnDef<RowData>[];
};

type TableCommonProps<RowData extends AnyObject = AnyObject> = Omit<
  BoxProps,
  "slots"
> & {
  data?: RowData[];
  columns?: ColumnDef[];
  slots?: {
    Container?: TableContainerComponent;
    Table?: TableComponent;
    TableHead?: TableHeadComponent;
    HeaderRow?: TableHeadRowComponent;
    TableBody?: TableBodyComponent;
    TableBodyRow?: CustomTableBodyRowComponent<RowData> | TableBodyRowComponent;
    EmptyDisplay?: ComponentType<any>;
  };
  slotProps?: {
    virtuoso?: Partial<VirtuosoProps<RowData>>;
    container?: Partial<TableContainerProps>;
    table?: Partial<TableProps>;
    tableHead?: Partial<TableHeadProps>;
    tableHeadRow?: Partial<TableRowProps>;
    tableBody?: Partial<TableBodyProps>;
    tableBodyRow?: Partial<TableRowProps> | GetBodyRowProps<RowData>;
  };
};

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<TableCommonStates>({
    colDefs: [],
  });

function createStateHooks<RowData extends AnyObject = AnyObject>() {
  return {
    // @ts-ignore
    useGetStateTable: useGetState as UseGetState<TableCommonStates<RowData>>,
    useInitStateTable: useInitState as UseInitState<TableCommonStates<RowData>>,
    useSetStateTable: useSetState as UseSetState<TableCommonStates<RowData>>,
  };
}

const ColDefsInit = memo(({ columns }: { columns?: ColumnDef[] }) => {
  useInitState("colDefs", columns, { when: "whenever-value-changes" });
  return null;
});

ColDefsInit.displayName = "ColDefsInit";

function createVirtuosoComponents<RowData extends AnyObject = AnyObject>({
  slots = {},
  slotProps = {},
}: {
  slots?: {
    Container?: TableContainerComponent;
    Table?: TableComponent;
    TableHead?: TableHeadComponent;
    TableHeadRow?: TableHeadRowComponent;
    TableBody?: TableBodyComponent;
    TableBodyRow?: TableBodyRowComponent;
    EmptyDisplay?: ComponentType<any>;
  };
  slotProps?: {
    container?: Partial<TableContainerProps>;
    table?: Partial<TableProps>;
    tableHead?: Partial<TableHeadProps>;
    tableBody?: Partial<TableBodyProps>;
    tableBodyRow?: Partial<TableRowProps> | GetBodyRowProps<RowData>;
  };
}) {
  const {
    Container = DefaultComponents.TableContainer,
    Table = DefaultComponents.Table,
    TableHead = DefaultComponents.TableHead,
    TableBodyRow = DefaultComponents.TableBodyRow,
    TableBody = DefaultComponents.TableBody,
    EmptyDisplay,
  } = slots;

  const {
    container: containerProps,
    table: tableProps,
    tableHead: tableHeadProps,
    tableBody: tableBodyProps,
    tableBodyRow: tableBodyRowProps,
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
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} {...tableBodyProps} />
    )),
    TableRow: forwardRef(({ item, ...props }, ref) => {
      let customProps = {};
      if (typeof tableBodyRowProps === "object")
        customProps = tableBodyRowProps;
      if (typeof tableBodyRowProps === "function")
        customProps = tableBodyRowProps({
          row: item,
          rowIndex: +props["data-index"],
        });
      return <TableBodyRow ref={ref as any} {...props} {...customProps} />;
    }),
    EmptyPlaceholder: forwardRef((_, ref) => {
      const colSpan = useGetState((s) => s?.colDefs?.length);
      return (
        <TableBody ref={ref as any}>
          <MuiTableRow>
            <TableCell colSpan={colSpan}>
              {!EmptyDisplay ? (
                <Box width="100%" textAlign="center" height="100%">
                  No data
                </Box>
              ) : (
                <EmptyDisplay />
              )}
            </TableCell>
          </MuiTableRow>
        </TableBody>
      );
    }),
  };

  // @ts-ignore
  components.Scroller.displayName = "VScroller";
  // @ts-ignore
  components.Table.displayName = "VTable";
  // @ts-ignore
  components.TableHead.displayName = "VTableHead";
  // @ts-ignore
  components.TableHeadRow.displayName = "VTableHeadRow";
  // @ts-ignore
  components.TableBody.displayName = "VTableBody";
  // @ts-ignore
  components.EmptyPlaceholder?.displayName = "VEmptyPlaceholder";

  return components;
}

function HeaderContent({
  Component = MuiTableRow,
  props,
}: {
  Component?: TableHeadRowComponent;
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
              : slotProps.head || {};
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
        const isDefaultComponent = !slots.Cell;
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
          <Cell
            key={_key}
            {...cellProps}
            {...(!isDefaultComponent
              ? {
                  renderParams: {
                    _key,
                    row,
                    rowIndex,
                    field,
                    columnIndex: i,
                    cellInner: inner,
                  },
                }
              : {})}
          >
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
  Component?: TableHeadRowComponent;
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
    const {
      HeaderRow,
      Container,
      TableBodyRow,
      Table,
      TableBody,
      TableHead,
      EmptyDisplay,
    } = slots;

    const {
      virtuoso: virtuosoProps,
      container: containerProps,
      table: tableProps,
      tableHead: tableHeadProps,
      tableHeadRow: tableHeadRowProps,
      tableBody: tableBodyProps,
      tableBodyRow: tableBodyRowProps,
    } = slotProps;

    const components = createVirtuosoComponents<RowData>({
      slots: {
        Container,
        Table,
        TableHead,
        TableBody,
        TableBodyRow,
        EmptyDisplay,
      },
      slotProps: {
        container: containerProps,
        table: tableProps,
        tableHead: tableHeadProps,
        tableBody: tableBodyProps,
        tableBodyRow: tableBodyRowProps,
      },
    });

    const fixedHeaderContent = createHeaderComponent({
      Component: HeaderRow,
      props: tableHeadRowProps,
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

function createColumn<RowData extends AnyObject = AnyObject>(
  colDef: Omit<ColumnDef<RowData>, "_key">
) {
  return { ...colDef, _key: newGuid() } as ColumnDef<RowData>;
}

export default TableCommon;
export { createColumn, createStateHooks };
export type {
  ColumnDef,
  CustomTableBodyCellComponent,
  GetBodyCellProps,
  GetBodyRowProps,
  GetHeadCellProps,
  TableBodyComponent,
  TableCommonProps,
  TableCommonStates,
  TableComponent,
  TableContainerComponent,
  TableHeadComponent,
};
