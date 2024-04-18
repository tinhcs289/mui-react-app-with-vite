import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const LogoutPage: RouteConfig = {
  name: "LogoutRoute",
  path: PATHS.logout,
  component: Page,
};

export default LogoutPage;
