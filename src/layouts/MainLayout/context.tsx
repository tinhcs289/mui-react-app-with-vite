import authInLocalStorage from "@/browser/local-storage/authentication";
import contentMaxWidth from "@/browser/local-storage/contentMaxWidth";
import PATHS from "@/constants/paths";
import createStatesContext from "@/helpers/react-context-helpers/createStatesContext";
import { Theme, useMediaQuery, type Breakpoint } from "@mui/material";
import { usePrevious } from "@uidotdev/usehooks";
import isEqual from "lodash/isEqual";
import type { ReactNode } from "react";
import { memo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_WIDTH } from "./constants";
import type { MenuItemData } from "./types";
import { asideItems } from "./aside-items";

function redirectToLogout() {
  window?.location?.replace?.(PATHS.login);
}

const NavigateToLogoutWhenAuthChange = memo(() => {
  useEffect(() => {
    authInLocalStorage.onChange(
      (_, { value: newAuth, previousValue: oldAuth }) => {
        if (!newAuth?.accessToken) {
          redirectToLogout();
          return;
        }
        if (!oldAuth?.accessToken) return;
        if (oldAuth.accessToken === newAuth.accessToken) return;
        redirectToLogout();
        return;
      }
    );
  }, []);
  return null;
});

NavigateToLogoutWhenAuthChange.displayName = " NavigateToLogoutWhenAuthChange";

export type LayoutStates = {
  isAsideOpen?: boolean;
  urlOfInteractMenuItem?: string | null;
  menuItems?: MenuItemData[];
  rootBreadcrumb?: MenuItemData[];
  pageTitle?: ReactNode | null;
  pageMaxWidth?: Breakpoint;
};

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<LayoutStates>({
    isAsideOpen: true,
    urlOfInteractMenuItem: null,
    menuItems: asideItems,
    rootBreadcrumb: [],
    pageTitle: null,
    pageMaxWidth: contentMaxWidth.get() || DEFAULT_WIDTH,
  });

export const useInitStateMainLayout = useInitState;
export const useGetStateMainLayout = useGetState;
export const useSetStateMainLayout = useSetState;

const PageWidthInitializer = memo(() => {
  const setState = useSetState();
  const currentMaxWidth = useGetState((s) => s.pageMaxWidth);

  useEffect(() => {
    contentMaxWidth.onChange((_, { value: newMaxWidth }) => {
      if (isEqual(newMaxWidth, currentMaxWidth)) return;
      setState({ pageMaxWidth: newMaxWidth || DEFAULT_WIDTH });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
});

PageWidthInitializer.displayName = "PageWidthInitializer";

const AsideInitializer = memo(() => {
  const location = useLocation();
  const prePathname = usePrevious((location?.pathname || "").split(/[?#]/)[0]);
  const setState = useSetState();

  const isMatchPath = useCallback(
    (url?: string, isExact?: boolean) => {
      if (!url || !location?.pathname) return false;

      const current = location?.pathname.split(/[?#]/)[0];
      if (!current) return false;
      if (current === url) return true;
      if (isExact && current.indexOf(url) > -1) return true;
      return false;
    },
    [location?.pathname]
  );

  useEffect(() => {
    setState({
      urlOfInteractMenuItem: (() => {
        if (!location?.pathname) return null;
        return location?.pathname.split(/[?#]/)[0];
      })(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initMenuItems = useCallback(
    (args: {
      items: MenuItemData[];
      interactUrl?: string;
      isFirstLoad?: boolean;
    }): { items: MenuItemData[]; interactUrl?: string } => {
      const { items, interactUrl, isFirstLoad } = args;
      let _url: string | null = null;
      const _items = items.map((item) => {
        const openSubMenu = isFirstLoad
          ? item.url === interactUrl ||
            (Array.isArray(item.childs) &&
              item.childs.findIndex((i) => isMatchPath(i.url)) >= 0)
          : item.url === interactUrl;

        if (openSubMenu && !!item.url) _url = item.url;

        return {
          ...item,
          active: isMatchPath(item.url),
          openSubMenu,
          childs: Array.isArray(item.childs)
            ? item.childs.map((child) => ({
                ...child,
                active: isMatchPath(child.url, true),
              }))
            : [],
        } as MenuItemData;
      });
      return {
        items: _items,
        interactUrl: _url || undefined,
      };
    },
    [isMatchPath]
  );

  const menuItems = useGetState((s) => s.menuItems);

  useEffect(() => {
    if (!location?.pathname) return;
    const newPath = location?.pathname.split(/[?#]/)[0];
    if (newPath !== prePathname) {
      const _state = initMenuItems({
        items: asideItems,
        interactUrl: urlOfInteractMenuItem || undefined,
        isFirstLoad: true,
      });
      if (!isEqual(_state.items, menuItems))
        setState({ menuItems: _state.items });
      if (_state.interactUrl !== urlOfInteractMenuItem)
        setState({ urlOfInteractMenuItem: _state.interactUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  useEffect(() => {
    const items = initMenuItems({ items: menuItems || [] }).items;
    setState({ menuItems: items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const urlOfInteractMenuItem = useGetState((s) => s.urlOfInteractMenuItem);

  useEffect(() => {
    if (!urlOfInteractMenuItem) {
      const items = initMenuItems({ items: asideItems }).items;
      setState({ menuItems: items });
    } else {
      const items = initMenuItems({
        items: menuItems || [],
        interactUrl: urlOfInteractMenuItem,
      }).items;
      setState({ menuItems: items });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlOfInteractMenuItem]);

  return null;
});

AsideInitializer.displayName = "AsideInitializer";

const BreadcrumbInitializer = memo(() => {
  const menuItems = useGetState((s) => s.menuItems);
  const pageTitle = useGetState((s) => s.pageTitle);
  const setState = useSetState();

  useEffect(() => {
    let title: ReactNode | null = null;
    let breadcrumb: MenuItemData[] = [];
    try {
      menuItems?.forEach?.((item) => {
        const tempBreadcrumb = [item];
        if (item.active) {
          title = item.label;
          breadcrumb = tempBreadcrumb;
          throw new Error();
        }
        if (Array.isArray(item.childs)) {
          item.childs.forEach((child) => {
            if (child.active) {
              tempBreadcrumb.push(child);
              breadcrumb = tempBreadcrumb;
              title = child.label;
              throw new Error();
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    if (isEqual(title, pageTitle)) return;
    setState({ pageTitle: title });
    setState({ rootBreadcrumb: breadcrumb });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItems]);

  return <></>;
});

BreadcrumbInitializer.displayName = "BreadcrumbInitializer";

const AutoToggleAsideByScreen = memo(() => {
  const setState = useSetState();
  const isAsideOpen = useGetState((s) => !!s?.isAsideOpen);

  const toggleAside = useCallback(() => {
    setState((states) => ({ ...states, isAsideOpen: !states?.isAsideOpen }));
  }, [setState]);

  const isMediumScreenOrLower = useMediaQuery((theme: Theme) =>
    theme?.breakpoints?.down?.("lg")
  );

  useEffect(() => {
    if (
      (isMediumScreenOrLower && isAsideOpen) ||
      (!isMediumScreenOrLower && !isAsideOpen)
    ) {
      toggleAside();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumScreenOrLower]);

  return null;
});

AutoToggleAsideByScreen.displayName = "AutoToggleAsideByScreen";

export function MainLayoutStatesProvider({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <StatesProvider>
      <PageWidthInitializer />
      <AsideInitializer />
      <AutoToggleAsideByScreen />
      <BreadcrumbInitializer />
      <NavigateToLogoutWhenAuthChange />
      {children}
    </StatesProvider>
  );
}

export function useBreadcrumb() {
  const setState = useSetState();

  const breadcrumb = useGetState((s) => s?.rootBreadcrumb);

  const appendBreadcrumb = useCallback(
    (items?: MenuItemData[]) => {
      if (!(items instanceof Array && items.length > 0)) return;
      const newItems = [...(breadcrumb || []), ...items];
      setTimeout(() => {
        setState({ rootBreadcrumb: newItems });
      }, 0);
    },
    [breadcrumb, setState]
  );

  return {
    breadcrumb,
    appendBreadcrumb,
  };
}
