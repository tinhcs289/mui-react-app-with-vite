import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const DemoTablePage: RouteConfig = {
  name: "DemoTableRoute",
  path: PATHS.tableList,
  component: Page,
};

export default DemoTablePage;
