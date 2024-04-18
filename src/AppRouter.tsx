import authentication from "@/browser/cookies/authentication";
import { RouteFallback } from "@/components/fallback";
import PATHS from "@/constants/paths";
import { RETURN_URI_HASH } from "@/constants/query-string";
import withHOCs from "@/helpers/react-helpers/withHocs";
import toEncodedUri from "@/helpers/string-helpers/toEncodedUri";
import useReturnUri from "@/hooks/common-hooks/useReturnUri";
import AuthLayout from "@/layouts/AuthLayout";
import LandingLayout from "@/layouts/LandingLayout";
import MainLayout from "@/layouts/MainLayout";
import InDevelopPage from "@/pages/InDevelopPage";
import type { NotFoundPageProps } from "@/pages/NotFoundPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { default as authRoutes } from "@/routes/auth";
import { default as privateRoutes } from "@/routes/private";
import { default as publicRoutes } from "@/routes/public";
import type { AppRouterComponent, AppRouterProps, RouteConfig } from "@/types";
import type { ComponentType } from "react";
import { createElement, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function renderNotFound(props?: Partial<NotFoundPageProps>) {
  if (!NotFoundPage.component) return null;
  return createElement(NotFoundPage.component, props);
}

function renderDevelopment() {
  if (!InDevelopPage.component) return null;
  return createElement(InDevelopPage.component);
}

function renderPage(page?: ComponentType<any>) {
  if (!page) return renderDevelopment();
  return createElement(page);
}

function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route: RouteConfig) => {
    if (!route.navigateTo)
      return (
        <Route
          key={route.name}
          path={route.path}
          element={
            <Suspense fallback={<RouteFallback />}>
              {renderPage(route.component)}
            </Suspense>
          }
        />
      );
    else
      return (
        <Route
          key={route.name}
          path={route.path}
          element={<Navigate to={route.navigateTo || ""} replace />}
        />
      );
  });
}

const AppRouter = withHOCs(
  function ifAuthenticated(
    WrappedComponent: AppRouterComponent
  ): AppRouterComponent {
    return function RoutesIfAuthenticated(props: AppRouterProps) {
      const accessToken = authentication.get()?.accessToken;
      if (!accessToken) return <WrappedComponent {...props} />;
      return (
        <BrowserRouter {...props}>
          <Routes>
            <Route element={<LandingLayout />}>
              {renderRoutes(publicRoutes)}
            </Route>
            <Route element={<MainLayout />}>
              {renderRoutes(privateRoutes)}
            </Route>
            <Route element={<MainLayout />}>
              <Route
                path={PATHS.notfound}
                element={
                  <Suspense fallback={<RouteFallback />}>
                    {renderNotFound({ contentOnly: true })}
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="*"
              element={<Navigate to={PATHS.notfound} replace />}
            />
          </Routes>
        </BrowserRouter>
      );
    };
  },
  function ifUnAuthenticated(
    WrappedComponent: AppRouterComponent
  ): AppRouterComponent {
    return function RoutesIfUnAuthenticated(props: AppRouterProps) {
      const accessToken = authentication.get()?.accessToken;
      const { buildReturnHash } = useReturnUri(RETURN_URI_HASH);
      if (!!accessToken) return <WrappedComponent {...props} />;
      return (
        <BrowserRouter {...props}>
          <Routes>
            <Route element={<LandingLayout />}>
              {renderRoutes(publicRoutes)}
            </Route>
            <Route element={<AuthLayout variant="fullWidth" />}>
              {renderRoutes(authRoutes)}
            </Route>
            {privateRoutes.map((route: RouteConfig) => {
              const returnHash = buildReturnHash(route);
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={
                    <Navigate
                      to={toEncodedUri(PATHS.login, returnHash)}
                      replace
                    />
                  }
                />
              );
            })}
            <Route element={<LandingLayout />}>
              <Route
                path={PATHS.notfound}
                element={
                  <Suspense fallback={<RouteFallback />}>
                    {renderNotFound()}
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="*"
              element={<Navigate to={PATHS.notfound} replace />}
            />
          </Routes>
        </BrowserRouter>
      );
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
)(function RootRouter(_: AppRouterProps) {
  return <></>;
});

export default AppRouter;
