import wait from "@/helpers/async-helpers/wait";
import { lazy } from "react";

const ShopeeProductListProvider = lazy(() =>
  wait().then(() =>
    import("./context").then((mod) => ({
      default: mod.ShopeeProductListProvider,
    }))
  )
);

const ShopeeProductListPaging = lazy(() =>
  wait().then(() => import("./ShopeeProductList/ShopeeProductListPaging"))
);

const ShopeeProductTable = lazy(() =>
  wait().then(() => import("./ShopeeProductTable"))
);

export default function ShopeeTable() {
  return (
    <ShopeeProductListProvider>
      <ShopeeProductListPaging />
      <ShopeeProductTable />
      <ShopeeProductListPaging />
    </ShopeeProductListProvider>
  );
}
