import wait from "@/helpers/async-helpers/wait";
import { lazy } from "react";

const PageContainer = lazy(() =>
  wait().then(() => import("@/layouts/MainLayout/PageContainer"))
);

const ShopeeTable = lazy(() =>
  wait().then(() => import("@/modules/Shopee/ShopeeTable"))
);

export default function Page() {
  return (
    <PageContainer sx={{ overflowY: "hidden", height: "100%" }}>
      <ShopeeTable />
    </PageContainer>
  );
}
