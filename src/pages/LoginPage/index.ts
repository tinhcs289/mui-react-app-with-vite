import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const LoginPage: RouteConfig = {
  name: "LoginRoute",
  path: PATHS.login,
  component: Page,
};

export default LoginPage;
