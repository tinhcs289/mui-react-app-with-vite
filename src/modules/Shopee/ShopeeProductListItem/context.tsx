import createStatesContext from "@/helpers/react-context-helpers/createStatesContext";
import type { ShopeeProductItem } from "@/mock/shopee/types";
import { memo } from "react";
import type { ReactNode } from "react";

export type ShopeeProductItemStates = {
  product?: ShopeeProductItem;
};

const {
  StatesProvider,
  useGetState: useGetShopeeProductItemState,
  useInitState: useInitShopeeProductItemState,
  useSetState: useSetShopeeProductItemState,
} = createStatesContext<ShopeeProductItemStates>();

export {
  useGetShopeeProductItemState,
  useInitShopeeProductItemState,
  useSetShopeeProductItemState,
};

const ProductInitializer = memo(
  ({ product }: { product?: ShopeeProductItem }) => {
    useInitShopeeProductItemState("product", product, {
      when: "whenever-value-changes",
    });
    return null;
  }
);
ProductInitializer.displayName = "ProductInitializer";

export function ShopeeProductItemProvider({
  product,
  children,
}: {
  product?: ShopeeProductItem;
  children?: ReactNode;
}) {
  return (
    <StatesProvider>
      <ProductInitializer product={product} />
      {children}
    </StatesProvider>
  );
}
