import wait from "@/helpers/async-helpers/wait";
import { lazy } from "react";

const PageContainer = lazy(() =>
  wait().then(() => import("@/layouts/MainLayout/PageContainer"))
);

const Shopee = lazy(() => wait().then(() => import("@/modules/Shopee")));

export default function Page() {
  return (
    <PageContainer sx={{ overflowY: "hidden", height: "100%" }}>
      <Shopee />
    </PageContainer>
  );
}
