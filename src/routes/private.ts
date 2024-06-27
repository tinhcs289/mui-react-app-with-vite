import LogoutPage from "@/pages/LogoutPage";
import MainPage from "@/pages/MainPage";
import MainNotFoundPage from "@/pages/MainPage/not-found";
import type { RouteConfig } from "@/types";
import { default as demoRoutes } from "./_demo";

const routes: RouteConfig[] = [
  //TODO [Router] add more route for private pages here
  ...demoRoutes,
  // #region Base pages
  MainPage,
  MainNotFoundPage,
  LogoutPage,
  // #endregion
];
export default routes;
