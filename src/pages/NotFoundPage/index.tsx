import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const NotFoundPage: RouteConfig = {
  name: "NotFoundRoute",
  path: PATHS.notfound,
  component: Page,
};

export default NotFoundPage;

export type { PageProps as NotFoundPageProps } from "./types";
