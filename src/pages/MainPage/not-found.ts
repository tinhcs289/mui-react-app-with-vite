import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("@/modules/Content404")));

const MainNotFoundPage: RouteConfig = {
  name: "MainNotFoundRoute",
  path: `${PATHS.main}/*`,
  component: Page,
};

export default MainNotFoundPage;
