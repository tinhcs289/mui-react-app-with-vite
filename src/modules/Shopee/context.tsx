import PaginatedList, {
  createStateHooks,
  ListStatesInitializer,
  // FetchDataInitializer,
  ReactQueryInitializer,
} from "@/components/list/PaginatedList";
import type { ShopeeElementSet, ShopeeProductItem } from "@/mock/shopee/types";
import { AnyObject } from "@/types";
import { useEffect, type ReactNode } from "react";
import getElementSet from "./services/getElementSet";
import getProducts from "./services/getProducts";

export const {
  useGetPaginatedListState,
  useInitPaginatedListState,
  useSetPaginatedListState,
  usePaginatedListAction,
} = createStateHooks<
  ShopeeProductItem,
  AnyObject,
  {
    elementSets?: ShopeeElementSet;
    fetchElementSets?: () => Promise<void>;
  }
>();

function ElementSetsInitializer() {
  const setState = useSetPaginatedListState();

  const fetchElementSets = usePaginatedListAction(
    "fetchElementSets",
    async () => {
      const elementSets = await getElementSet();
      setState({ elementSets });
    },
    [setState]
  );

  useEffect(function fetchElementSetOnMount() {
    const fetchOnMount = async () => {
      await fetchElementSets();
    };
    fetchOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function ShopeeProductListProvider({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <PaginatedList>
      <ListStatesInitializer idField="itemid" pageSize={60} />
      <ReactQueryInitializer
        queryFn={getProducts}
        queryKey="/products/list"
        fetchDataOnFirstMount
      />
      <ElementSetsInitializer />
      {children}
    </PaginatedList>
  );
}
