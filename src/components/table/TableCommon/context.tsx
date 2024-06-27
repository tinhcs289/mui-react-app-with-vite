import createStatesContext, {
  UseGetState,
  UseInitState,
  UseSetState,
} from "@/helpers/react-context-helpers/createStatesContext";
import type { AnyObject } from "@/types";
import { memo } from "react";
import type { ColumnDef, TableCommonStates } from "./types";

export const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<TableCommonStates>({
    colDefs: [],
  });

/**
 * 
 * @example
    const { useGetStateTable } = createStateHooks<SomeRowData>();

    function AnyComponentInsideTable() {
      const columns = useGetStateTable(s => s?.colDefs);

      ....
    }
 */
export function createStateHooks<RowData extends AnyObject = AnyObject>() {
  return {
    useGetStateTable: useGetState as UseGetState<TableCommonStates<RowData>>,
    useInitStateTable: useInitState as UseInitState<TableCommonStates<RowData>>,
    useSetStateTable: useSetState as UseSetState<TableCommonStates<RowData>>,
  };
}

export const ColDefsInit = memo(({ columns }: { columns?: ColumnDef[] }) => {
  useInitState("colDefs", columns, { when: "whenever-value-changes" });
  return null;
});

ColDefsInit.displayName = "ColDefsInit";
