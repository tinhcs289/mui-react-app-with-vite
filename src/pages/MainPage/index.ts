import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const MainPage: RouteConfig = {
  name: "MainRoute",
  path: PATHS.main,
  component: Page,
};

export default MainPage;
