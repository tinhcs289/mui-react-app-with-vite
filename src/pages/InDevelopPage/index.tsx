import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const InDevelopPage: RouteConfig = {
  name: "InDevelopRoute",
  path: PATHS.inDevelop,
  component: Page,
};

export default InDevelopPage;

export type { PageProps as InDevelopPageProps } from "./types";
