import LogoutPage from "@/pages/LogoutPage";
import MainPage from "@/pages/MainPage";
import MainNotFoundPage from "@/pages/MainPage/not-found";
import type { RouteConfig } from "@/types";

const routes: RouteConfig[] = [
  MainPage,
  MainNotFoundPage,
  //TODO [Router] add more route for private pages here
  LogoutPage,
];
export default routes;
