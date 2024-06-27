import authentication from "@/browser/cookies/authentication";
import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import toEncodedUri from "@/helpers/string-helpers/toEncodedUri";
import { useReturnUriWhenUnAuthenticate } from "@/hooks/common-hooks/useReturnUri";
import InDevelopPage from "@/pages/InDevelopPage";
import type { NotFoundPageProps } from "@/pages/NotFoundPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { default as authRoutes } from "@/routes/auth";
import { default as privateRoutes } from "@/routes/private";
import { default as publicRoutes } from "@/routes/public";
import type { AppRouterComponent, AppRouterProps, RouteConfig } from "@/types";
import type { ComponentType } from "react";
import { Fragment, lazy, Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Fallback = lazy(() =>
  wait().then(() => import("@/components/fallback/RouteFallback"))
);

const Layout = {
  Auth: lazy(() => wait().then(() => import("@/layouts/AuthLayout"))),
  Landing: lazy(() => wait().then(() => import("@/layouts/LandingLayout"))),
  Main: lazy(() => wait().then(() => import("@/layouts/MainLayout"))),
};

const NotFound = (NotFoundPage.component ||
  Fragment) as ComponentType<NotFoundPageProps>;

function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route: RouteConfig) => {
    const Page = route.component || InDevelopPage.component || Fragment;
    return (
      <Route
        key={route.name}
        path={route.path}
        element={
          !route.navigateTo ? (
            <Suspense fallback={<Fallback />}>
              <Page />
            </Suspense>
          ) : (
            <Navigate to={route.navigateTo || ""} replace />
          )
        }
      />
    );
  });
}

export default function whenUnAuthenticated(
  WrappedComponent: AppRouterComponent
): AppRouterComponent {
  return function RoutesWhenUnAuthenticated(props: AppRouterProps) {
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(
      function checkAuthOnMount() {
        if (isCheck) return;
        const accessToken = authentication.get()?.accessToken;
        setIsAuthenticated(!!accessToken);
        setIsCheck(true);
      },
      [isCheck]
    );

    const { buildReturnHash } = useReturnUriWhenUnAuthenticate();

    const $RoutesOrOtherCase = useMemo(
      () =>
        !isCheck ? null : isAuthenticated ? (
          <WrappedComponent {...props} />
        ) : (
          <BrowserRouter {...props}>
            <Routes>
              <Route element={<Layout.Landing />}>
                {renderRoutes(publicRoutes)}
              </Route>
              <Route element={<Layout.Auth variant="fullWidth" />}>
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
              <Route element={<Layout.Landing />}>
                <Route
                  path={PATHS.notfound}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <NotFound />
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
        ),
      [isCheck, isAuthenticated, buildReturnHash, props]
    );

    return $RoutesOrOtherCase;
  };
}
