import type {
  UseAction,
  UseGetState,
  UseInitState,
  UseSetState,
} from "@/helpers/react-context-helpers/createStatesContext";
import createStatesContext from "@/helpers/react-context-helpers/createStatesContext";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import omit from "lodash/omit";
import unionBy from "lodash/unionBy";
import type { ReactNode } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "react-query";

type AnyObject = { [x: string]: any };

type SortDirection = "asc" | "desc";

type SortOperator = {
  by: string;
  direction: SortDirection;
};

type ListFilter<Filter extends AnyObject = AnyObject> = {
  searchText?: string;
} & Filter;

type GetIteratiorListPayload<Filter extends AnyObject = AnyObject> = {
  nextId?: number | string | null;
  pageSize?: number;
  advanceFilter?: ListFilter<Filter>;
  sortBy?: SortOperator[];
};

type GetIteratiorListReturns<Item extends AnyObject = AnyObject> = {
  result: Item[];
  totalCount: number;
  nextId?: number | string | null;
  canLoadMore?: boolean;
};

type GetIteratiorList<
  Item extends AnyObject = AnyObject,
  Filter extends AnyObject = AnyObject
> = (
  payload: GetIteratiorListPayload<Filter>
) => Promise<GetIteratiorListReturns<Item>>;

type FetchDataPayload<Filter extends AnyObject = AnyObject> = {
  nextId?: number | string | null;
  pageSize?: number;
  advanceFilter?: ListFilter<Filter>;
  sortBy?: SortOperator[];
};

type FetchDataOptions = {
  by?: "payload-only" | "payload-and-current-states";
};

type FetchData<Filter extends AnyObject = AnyObject> = (
  payload?: FetchDataPayload<Filter>,
  options?: FetchDataOptions
) => void;

type Interaction<Item extends AnyObject = AnyObject> = {
  action: string;
  item?: Item | null;
  element?: Element | HTMLElement | null;
  keepAnchor?: boolean;
  keepInteract?: boolean;
};

type IteratiorListStates<
  Item extends AnyObject = AnyObject,
  Filter extends AnyObject = AnyObject,
  ExtendedStates extends AnyObject = AnyObject
> = {
  initialized?: {
    request?: boolean;
    states?: boolean;
  };
  /**
   * @default 'id'
   */
  idField?: string;
  items?: Item[];
  itemsInPage?: Item[];
  totalCount?: number;
  nextId?: number | string | null;
  pageSize?: number;
  canLoadMore?: boolean;
  defaultFilter?: ListFilter<Filter>;
  fixedFilter?: ListFilter<Filter>;
  advanceFilter?: ListFilter<Filter>;
  sortBy?: SortOperator[];
  selectable?: boolean;
  requestState?: "none" | "fetching" | "success" | "fail";
  /**
   * @default 'over-all-pages'
   */
  typeOfSelection?: "only-on-page" | "over-all-pages";
  selectedItems?: Item[];
  isSelectedAll?: boolean;
  itemToInteract?: Item | null;
  itemInteractAction?: string;
  itemInteractAnchor?: Element | HTMLElement | null;
  //
  checkAllItems?: (checked: boolean) => void;
  checkOrUnCheckItem?: (item: Item) => void;
  setInteraction?: (interaction: Interaction<Item>) => void;
  clearInteraction?: () => void;
  refresh?: () => void;
  fetchData?: FetchData<Filter>;
  loadMore?: (size?: number) => void;
  updateSort?: (by: SortOperator[], keepCurrentSorting?: boolean) => void;
  updateFilter?: (
    filter: ListFilter<Filter>,
    keepCurrentFilter?: boolean
  ) => void;
} & ExtendedStates;

function concatArray<T>(...arrs: T[][]) {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
}

const { StatesProvider, useGetState, useInitState, useSetState, useAction } =
  createStatesContext<IteratiorListStates>({
    initialized: {
      states: false,
      request: false,
    },
    idField: "id",
    selectable: true,
    typeOfSelection: "over-all-pages",
    totalCount: 0,
    items: [],
    itemsInPage: [],
    nextId: null,
    canLoadMore: true,
    pageSize: 10,
    sortBy: [],
    advanceFilter: {},
    selectedItems: [],
    isSelectedAll: false,
    itemToInteract: null,
    itemInteractAction: "",
    itemInteractAnchor: null,
    requestState: "none",
  });

function createStateHooks<
  Item extends AnyObject = AnyObject,
  Filter extends AnyObject = AnyObject,
  ExtendedStates extends AnyObject = AnyObject
>() {
  return {
    useGetIteratiorListState: useGetState as UseGetState<
      IteratiorListStates<Item, Filter, ExtendedStates>
    >,
    useSetIteratiorListState: useSetState as UseSetState<
      IteratiorListStates<Item, Filter, ExtendedStates>
    >,
    useInitIteratiorListState: useInitState as UseInitState<
      IteratiorListStates<Item, Filter, ExtendedStates>
    >,
    useIteratiorListAction: useAction as UseAction<
      IteratiorListStates<Item, Filter, ExtendedStates>
    >,
  };
}

const LoadMoreInitializer = memo(() => {
  const pageSize = useGetState((s) => s?.pageSize || 10);
  const fetchData = useGetState((s) => s?.fetchData);

  const loadMore = useCallback(
    (size?: number) => {
      fetchData?.(
        { pageSize: size || pageSize },
        { by: "payload-and-current-states" }
      );
    },
    [pageSize, fetchData]
  );

  useInitState("loadMore", loadMore, {
    when: "whenever-value-changes",
  });

  return null;
});
LoadMoreInitializer.displayName = "LoadMoreInitializer";

const UpdateSortInitializer = memo(() => {
  const sortBy = useGetState((s) => s?.sortBy);
  const fetchData = useGetState((s) => s?.fetchData);

  const updateSort = useCallback(
    (by: SortOperator[], keepCurrentSorting: boolean = false) => {
      if (!by?.length) return;
      fetchData?.(
        {
          sortBy: !keepCurrentSorting
            ? by
            : unionBy([...(sortBy || []), ...by], "by"),
        },
        { by: "payload-and-current-states" }
      );
    },
    [sortBy, fetchData]
  );

  useInitState("updateSort", updateSort, {
    when: "whenever-value-changes",
  });

  return null;
});
UpdateSortInitializer.displayName = "UpdateSortInitializer";

const UpdateFilternitializer = memo(() => {
  const fetchData = useGetState((s) => s?.fetchData);

  const updateFilter = useCallback(
    (filter: ListFilter, keepCurrentFilter = true) => {
      if (typeof filter !== "object" || !Object.keys(filter).length) return;
      fetchData?.(
        {
          advanceFilter: { ...filter },
        },
        {
          by: keepCurrentFilter ? "payload-and-current-states" : "payload-only",
        }
      );
    },
    [fetchData]
  );

  useInitState("updateFilter", updateFilter, {
    when: "whenever-value-changes",
  });

  return null;
});
UpdateFilternitializer.displayName = "UpdateFilternitializer";

type FetchDataInitializerProps<
  Item extends AnyObject = AnyObject,
  Filter extends AnyObject = AnyObject
> = {
  onGetList: GetIteratiorList<Item, Filter>;
  fetchDataOnFirstMount?: boolean;
  infinite?: boolean;
};

const FetchDataInitializer = memo(
  ({
    onGetList,
    fetchDataOnFirstMount = false,
    infinite = false,
  }: FetchDataInitializerProps) => {
    const setState = useSetState();
    const requestState = useGetState((s) => s?.requestState);
    const nextId = useGetState((s) => s.nextId);
    const canLoadMore = useGetState((s) => !!s.canLoadMore);
    const pageSize = useGetState((s) => s.pageSize);
    const sortBy = useGetState((s) => s.sortBy);
    const advanceFilter = useGetState((s) => s?.advanceFilter);
    const defaultFilter = useGetState((s) => s?.defaultFilter);
    const fixedFilter = useGetState((s) => s?.fixedFilter);

    const getQueryArgs = useCallback(
      (
        payload?: FetchDataPayload,
        options?: FetchDataOptions
      ): FetchDataPayload & {
        appliedFilter: FetchDataPayload["advanceFilter"];
      } => {
        const { by = "payload-and-current-states" } = options || {};
        const isOverrided = by === "payload-only";

        const args: FetchDataPayload & {
          appliedFilter: FetchDataPayload["advanceFilter"];
        } = {
          nextId: payload?.nextId || nextId || null,
          pageSize: isOverrided
            ? payload?.pageSize
            : payload?.pageSize || pageSize,
          sortBy: isOverrided
            ? payload?.sortBy || []
            : unionBy(
                concatArray<SortOperator>(payload?.sortBy || [], sortBy || []),
                (s) => s.by
              ),
          advanceFilter: !isOverrided
            ? {
                ...advanceFilter,
                ...payload?.advanceFilter,
              }
            : {
                ...payload?.advanceFilter,
              },
          appliedFilter: !isOverrided
            ? {
                ...defaultFilter,
                ...advanceFilter,
                ...payload?.advanceFilter,
                ...fixedFilter,
              }
            : {
                ...payload?.advanceFilter,
                ...fixedFilter,
              },
        };
        return args;
      },
      [nextId, pageSize, sortBy, advanceFilter, fixedFilter, defaultFilter]
    );

    const fetchData: FetchData = useCallback(
      (payload, options) => {
        if (!canLoadMore) return;
        if (!onGetList) return;
        if (requestState === "fetching") return;
        const queryArgs = getQueryArgs(payload, options);

        setTimeout(() => {
          setState((states) => ({
            ...states,
            pageSize: queryArgs.pageSize,
            sortBy: queryArgs.sortBy,
            advanceFilter: {
              ...states?.advanceFilter,
              ...payload?.advanceFilter,
            },
          }));
        }, 0);

        const getListArgs = omit(cloneDeep(queryArgs), "appliedFilter");
        getListArgs.advanceFilter = queryArgs.appliedFilter;

        onGetList(queryArgs)
          .then((res) => {
            const result = Array.isArray(res?.result) ? res.result : [];
            const totalCount = Number.isInteger(res?.totalCount)
              ? res.totalCount
              : 0;
            const newNextId = res?.nextId || null;
            const canLoadMore = !!res?.canLoadMore;
            setState((states) => ({
              ...states,
              nextId: newNextId,
              canLoadMore,
              itemsInPage: result,
              ...(infinite
                ? {
                    items: concatArray(states?.items || [], result),
                  }
                : {}),
              totalCount: totalCount,
              requestState: "success",
            }));
          })
          .catch((error) => {
            console.log(error);
            setState({ requestState: "fail" });
          })
          .finally(() => {
            setState({ requestState: "none" });
          });
      },
      [requestState, infinite, canLoadMore, onGetList, getQueryArgs, setState]
    );

    useInitState("fetchData", fetchData, {
      when: "whenever-value-changes",
    });

    const initialized = useGetState((s) => s?.initialized);

    useEffect(() => {
      if (!fetchDataOnFirstMount) return;
      if (initialized?.request) return;
      if (!initialized?.states) return;

      setState((states) => ({
        ...states,
        initialized: { ...states?.initialized, request: true },
      }));

      const fetchOnMount = () => {
        fetchData();
      };

      fetchOnMount();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDataOnFirstMount, initialized]);

    return null;
  }
) as <Item extends AnyObject = AnyObject, Filter extends AnyObject = AnyObject>(
  props: FetchDataInitializerProps<Item, Filter>
) => JSX.Element;

// @ts-ignore
FetchDataInitializer.displayName = "FetchDataInitializer";

const SelectAllInitializer = memo(() => {
  const setState = useSetState();
  const idField = useGetState((s) => s?.idField);

  const getId = useCallback(
    (item?: AnyObject) => (!!idField ? (get(item, idField) as string) : ""),
    [idField]
  );

  const dataInPage = useGetState((s) => s.itemsInPage);
  const selectedItems = useGetState((s) => s.selectedItems);
  const isSelectable = useGetState((s) => !!s?.selectable);

  const checkAllItems = useCallback(
    (checked: boolean = true) => {
      if (!isSelectable) return;
      setState({ isSelectedAll: checked });
      setTimeout(() => {
        if (!Array.isArray(dataInPage) || dataInPage.length === 0) return;
        if (checked) {
          const selecteds = concatArray(
            selectedItems || [],
            dataInPage.filter((i) => {
              const id = getId(i);
              if (!id) return false;
              return (
                (selectedItems || []).findIndex((s) => getId(s) === id) < 0
              );
            })
          );
          setState({
            selectedItems: selecteds,
          });
        } else {
          const listUncheckIds = dataInPage.map((i) => getId(i));
          const selecteds = (selectedItems || []).filter(
            (i) => !listUncheckIds.includes(getId(i))
          );
          setState({
            selectedItems: selecteds,
          });
        }
      }, 0);
      return;
    },
    [getId, selectedItems, dataInPage, isSelectable, setState]
  );

  useInitState("checkAllItems", checkAllItems, {
    when: "whenever-value-changes",
  });

  return null;
});

SelectAllInitializer.displayName = "SelectAllInitializer";

const SelectionInitializer = memo(() => {
  const setState = useSetState();
  const idField = useGetState((s) => s?.idField);

  const getId = useCallback(
    (item?: AnyObject) => (!!idField ? (get(item, idField) as string) : ""),
    [idField]
  );

  const dataInPage = useGetState((s) => s.itemsInPage);
  const selectedItems = useGetState((s) => s.selectedItems);
  const isSelectable = useGetState((s) => !!s?.selectable);

  const isCheckAll = useCallback(
    (checks: AnyObject[] = [], pageData: AnyObject[] = []) => {
      if (!Array.isArray(checks) || checks.length === 0) return false;
      if (!Array.isArray(pageData) || pageData.length === 0) return false;
      if (checks.length < pageData.length) return false;
      let is = true,
        i = 0;
      while (is && i < pageData.length) {
        const item = pageData[i];
        if (checks.findIndex((check) => getId(check) === getId(item)) < 0)
          is = false;
        else i++;
      }
      return is;
    },
    [getId]
  );

  const checkOneItem = useCallback(
    (item: AnyObject) => {
      if (!isSelectable) return;
      if (!item) return;
      const id = getId(item);
      if (!id) return;
      const selectedItemIds = selectedItems?.map?.((i) => getId(i)) || [];
      const hasCheckedBefore = selectedItemIds.includes(id);
      const shouldChecked = !hasCheckedBefore;
      if (shouldChecked) {
        const selecteds = concatArray(selectedItems || [], [item]);
        const shouldCheckAll = isCheckAll(selecteds, dataInPage);
        setTimeout(() => {
          setState({ isSelectedAll: shouldCheckAll });
        }, 0);
        setTimeout(() => {
          setState({
            selectedItems: selecteds,
          });
        }, 0);
        return;
      } else {
        const selecteds = (selectedItems || []).filter((i) => getId(i) !== id);
        const shouldCheckAll = isCheckAll(selecteds, dataInPage);
        setTimeout(() => {
          setState({ isSelectedAll: shouldCheckAll });
        }, 0);
        setTimeout(() => {
          setState({
            selectedItems: selecteds,
          });
        }, 0);
        return;
      }
    },
    [getId, selectedItems, dataInPage, isSelectable, isCheckAll, setState]
  );

  useInitState("checkOrUnCheckItem", checkOneItem, {
    when: "whenever-value-changes",
  });

  return null;
});

SelectionInitializer.displayName = "SelectionInitializer";

const InteractionInitializer = memo(() => {
  const setState = useSetState();

  const setInteraction = useCallback(
    (interaction: Interaction) => {
      const { action, item, element, keepAnchor, keepInteract } = interaction;
      if (!action) return;
      setState({ itemInteractAction: action });
      if (!!item) setState({ itemToInteract: item as any });
      else {
        if (!keepInteract) setState({ itemToInteract: null });
      }
      if (!!element) setState({ itemInteractAnchor: element });
      else {
        if (!keepAnchor) setState({ itemInteractAnchor: null });
      }
      return;
    },
    [setState]
  );

  useInitState("setInteraction", setInteraction, {
    when: "whenever-value-changes",
  });

  const clearInteraction = useCallback(() => {
    setState({
      itemToInteract: null,
      itemInteractAction: "",
      itemInteractAnchor: null,
    });
  }, [setState]);

  useInitState("clearInteraction", clearInteraction, {
    when: "whenever-value-changes",
  });

  return null;
});

InteractionInitializer.displayName = "InteractionInitializer";

type ListStatesInitializerProps<Filter extends AnyObject = AnyObject> = {
  idField?: string;
  selectable?: boolean;
  pageIndex?: number;
  pageSize?: number;
  defaultFilter?: ListFilter<Filter>;
  fixedFilter?: ListFilter<Filter>;
  fetchDataOnFirstMount?: boolean;
  typeOfSelection?: IteratiorListStates["typeOfSelection"];
};

const ListStatesInitializer = memo(
  ({
    idField = "id",
    selectable = true,
    typeOfSelection = "over-all-pages",
    pageIndex = 1,
    pageSize = 10,
    defaultFilter,
    fixedFilter,
  }: ListStatesInitializerProps) => {
    const init1 = useInitState("typeOfSelection", typeOfSelection, {
      when: "whenever-value-changes",
    });
    const init2 = useInitState("idField", idField, {
      when: "whenever-value-changes",
    });
    const init3 = useInitState("selectable", selectable, {
      when: "whenever-value-changes",
    });
    const init4 = useInitState("pageIndex", pageIndex, {
      when: "whenever-value-changes",
    });
    const init5 = useInitState("pageSize", pageSize, {
      when: "whenever-value-changes",
    });
    const init6 = useInitState("defaultFilter", defaultFilter, {
      when: "whenever-value-changes",
    });
    const init7 = useInitState("fixedFilter", fixedFilter, {
      when: "whenever-value-changes",
    });

    const setState = useSetState();

    useEffect(() => {
      const initialized =
        [init1, init2, init3, init4, init5, init6, init7].findIndex(
          (i) => !i
        ) !== -1;

      if (!initialized) return;
      setState((states) => ({
        ...states,
        initialized: { ...states?.initialized, states: true },
      }));
    }, [init1, init2, init3, init4, init5, init6, init7, setState]);

    return null;
  }
) as <Filter extends AnyObject = AnyObject>(
  props: ListStatesInitializerProps<Filter>
) => JSX.Element;

// @ts-ignore
ListStatesInitializer.displayName = "ListStatesInitializer";

type ReactQueryInitializerProps<
  Item extends AnyObject = AnyObject,
  Filter extends AnyObject = AnyObject
> = {
  queryKey: string;
  queryFn: GetIteratiorList<Item, Filter>;
  fetchDataOnFirstMount?: boolean;
  infinite?: boolean;
  queryOptions?: Partial<
    Omit<Parameters<typeof useQuery>[0], "queryFn" | "queryKey" | "enabled">
  >;
};

const ReactQueryInitializer = memo(
  ({
    queryKey,
    queryFn,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    infinite = false,
    fetchDataOnFirstMount = true,
    queryOptions,
  }: ReactQueryInitializerProps) => {
    const setState = useSetState();
    const nextId = useGetState((s) => s.nextId);
    const pageSize = useGetState((s) => s.pageSize);
    const canLoadMore = useGetState((s) => !!s.canLoadMore);
    const sortBy = useGetState((s) => s.sortBy);
    const advanceFilter = useGetState((s) => s?.advanceFilter);
    const defaultFilter = useGetState((s) => s?.defaultFilter);
    const fixedFilter = useGetState((s) => s?.fixedFilter);
    const initialized = useGetState((s) => s?.initialized);

    const { data, isSuccess, isLoading, isError, isFetching, isFetched } =
      useQuery({
        queryKey: [queryKey as string, nextId, pageSize, sortBy, advanceFilter],
        queryFn: () =>
          queryFn({
            nextId,
            pageSize,
            sortBy,
            advanceFilter,
          }),
        enabled: fetchDataOnFirstMount,
        ...queryOptions,
      });

    const totalCount = useMemo(() => data?.totalCount || 0, [data?.totalCount]);
    useInitState("totalCount", totalCount, { when: "whenever-value-changes" });

    const result = useMemo(() => data?.result || [], [data?.result]);
    useInitState("itemsInPage", result, { when: "whenever-value-changes" });

    const newNextId = useMemo(() => data?.nextId || null, [data?.nextId]);
    useInitState("nextId", newNextId as any, {
      when: "whenever-value-changes",
    });

    const newCanLoadMore = useMemo(
      () => !!data?.canLoadMore,
      [data?.canLoadMore]
    );
    useInitState("canLoadMore", newCanLoadMore, {
      when: "whenever-value-changes",
    });

    useEffect(() => {
      if (initialized?.request) return;
      if (!isFetched) return;
      if (!isSuccess) return;
      setState((states) => ({
        ...states,
        initialized: { ...states?.initialized, request: true },
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, isFetched, isSuccess]);

    useEffect(() => {
      if (!result?.length) return;
      if (!infinite) {
        setState({ items: result });
      } else {
        setState((states) => ({
          ...states,
          items: concatArray(states?.items || [], result),
        }));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infinite, result]);

    useEffect(() => {
      if (!isError) return;
      setState({ requestState: "fail" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);

    useEffect(() => {
      if (!isLoading) return;
      if (!isFetching) return;
      setState({ requestState: "fetching" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching]);

    useEffect(() => {
      if (!isSuccess) return;
      if (!isFetched) return;
      setState({ requestState: "success" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isFetched]);

    const getQueryArgs = useCallback(
      (
        payload?: FetchDataPayload,
        options?: FetchDataOptions
      ): FetchDataPayload => {
        const { by = "payload-and-current-states" } = options || {};
        const isOverrided = by === "payload-only";
        const args: FetchDataPayload = {
          nextId: payload?.nextId || nextId || null,
          pageSize: isOverrided
            ? payload?.pageSize
            : payload?.pageSize || pageSize,
          sortBy: isOverrided
            ? payload?.sortBy || []
            : unionBy(
                concatArray<SortOperator>(payload?.sortBy || [], sortBy || []),
                (s) => s.by
              ),
          advanceFilter: !isOverrided
            ? {
                ...defaultFilter,
                ...advanceFilter,
                ...payload?.advanceFilter,
                ...fixedFilter,
              }
            : {
                ...payload?.advanceFilter,
                ...fixedFilter,
              },
        };
        return args;
      },
      [nextId, pageSize, sortBy, advanceFilter, fixedFilter, defaultFilter]
    );

    const fetchData: FetchData = useCallback(
      (payload, options) => {
        if (!canLoadMore) return;
        const args = getQueryArgs(payload, options);
        setState((states) => ({
          ...states,
          pageSize: args.pageSize,
          sortBy: args.sortBy,
          advanceFilter: args.advanceFilter,
        }));
      },
      [canLoadMore, getQueryArgs, setState]
    );

    useInitState("fetchData", fetchData, {
      when: "whenever-value-changes",
    });

    return null;
  }
) as <Item extends AnyObject = AnyObject, Filter extends AnyObject = AnyObject>(
  props: ReactQueryInitializerProps<Item, Filter>
) => JSX.Element;

// @ts-ignore
ReactQueryInitializer.displayName = "ReactQueryInitializer";

/**
 * @example
  import IteratiorList, { ListStatesInitializer, FetchDataInitializer, ReactQueryInitializer, createStateHooks } from "@/components/list/IteratiorList;

  const { 
    useGetIteratiorListState, 
    useSetIteratiorListState,
    useInitIteratiorListState,
  } = createStateHooks<ListItemData>();

  function SomewhereInsideMyList({ someDefaultValue }: any) {
    useInitIteratiorListState('someState', someDefaultValue, { when: 'whenever-value-changes' });

    const setState = useSetIteratiorListState();
    const someState = useGetIteratiorListState(state => state?.someState);

    const changeSomeText = () => {
      setState({ someState: 'foo' })
    }

    return <div onClick={changeSomeText}>{someState}</div>
  }

  function MyListWrapComponent() {
    return (
      <IteratiorList>
        // default initializers
        <ListStatesInitializer {....some-default-values} />
        <FetchDataInitializer onGetList={someAsyncFunctionToGetData} {...some-other-props} />
        
        // ... my components go here
        <SomeComponentInsideMyList />
      </IteratiorList>
    );
  }
  
  * @example 
  // intergrate with react-query
  <IteratiorList>
    // default initializers
    <ListStatesInitializer {....some-default-values} />
    <ReactQueryInitializer queryFn={someAsyncFunctionToGetData} {...some-query-config} />
    // ... my components go here
  </IteratiorList>
 */
function IteratiorList({ children }: { children?: ReactNode }) {
  return (
    <StatesProvider>
      <SelectionInitializer />
      <SelectAllInitializer />
      <InteractionInitializer />
      <LoadMoreInitializer />
      <UpdateSortInitializer />
      <UpdateFilternitializer />
      {children}
    </StatesProvider>
  );
}

export default IteratiorList;

export {
  createStateHooks,
  FetchDataInitializer,
  ListStatesInitializer,
  ReactQueryInitializer,
};

export type {
  FetchData,
  FetchDataInitializerProps,
  FetchDataOptions,
  FetchDataPayload,
  GetIteratiorList,
  GetIteratiorListPayload,
  GetIteratiorListReturns,
  Interaction,
  ListFilter,
  ListStatesInitializerProps,
  IteratiorListStates,
  ReactQueryInitializerProps,
  SortDirection,
  SortOperator,
};
