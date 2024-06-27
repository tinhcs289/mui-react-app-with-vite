import wait from "@/helpers/async-helpers/wait";
import { lazy } from "react";

const ShopeeProductListProvider = lazy(() =>
  wait().then(() =>
    import("./context").then((mod) => ({
      default: mod.ShopeeProductListProvider,
    }))
  )
);

const ShopeeProductList = lazy(() =>
  wait().then(() => import("./ShopeeProductList"))
);

const ShopeeProductListPaging = lazy(() =>
  wait().then(() => import("./ShopeeProductList/ShopeeProductListPaging"))
);

export default function Shopee() {
  return (
    <ShopeeProductListProvider>
      <ShopeeProductListPaging />
      <ShopeeProductList sx={{ height: "calc(100% - 100px)" }} />
      <ShopeeProductListPaging />
    </ShopeeProductListProvider>
  );
}
