import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const DemoListPage: RouteConfig = {
  name: "DemoListRoute",
  path: PATHS.gridList,
  component: Page,
};

export default DemoListPage;
