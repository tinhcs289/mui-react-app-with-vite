import BoxTooltip from "@/components/box/BoxTooltip";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material";
import type { DrawerProps } from "@mui/material/Drawer";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import type { ListProps } from "@mui/material/List";
import List from "@mui/material/List";
import type { ToolbarProps } from "@mui/material/Toolbar";
import Toolbar, { toolbarClasses } from "@mui/material/Toolbar";
import type { ReactNode } from "react";
import { memo, useCallback, useMemo } from "react";
import {
  APP_BAR_HEIGHT,
  ASIDE_BOTTOM_HEIGHT,
  ASIDE_MENU_WIDTH,
} from "../constants";
import { useGetStateMainLayout, useSetStateMainLayout } from "../context";
import AsideBottom from "./AsideBottom";
import AsideMenuList from "./AsideMenuList";

function AsideToggleButton() {
  const setState = useSetStateMainLayout();
  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);

  const toggleAside = useCallback(() => {
    setState((states) => ({ ...states, isAsideOpen: !states?.isAsideOpen }));
  }, [setState]);

  const $Button = useMemo(() => {
    if (isAsideOpen) return null;
    return (
      <BoxTooltip tooltipProps={{ title: "Mở rộng" }}>
        <IconButton
          onClick={toggleAside}
          sx={{ color: (theme) => theme.palette.primary.contrastText }}
        >
          <MenuIcon />
        </IconButton>
      </BoxTooltip>
    );
  }, [isAsideOpen, toggleAside]);

  return $Button;
}

const ToolbarStyled = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingLeft: `${theme.spacing(1)} !important`,
  paddingRight: `${theme.spacing(1)} !important`,
  background: "transparent",
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (p) => p !== "open",
})<DrawerProps>(({ theme, open }) => ({
  height: "100svh",
  boxSizing: "border-box",
  ...(!open
    ? {
        zIndex: theme.zIndex.modal + 2,
      }
    : {}),
  [`& .${drawerClasses.paper}`]: {
    boxSizing: "border-box",
    position: "relative",
    whiteSpace: "nowrap",
    width: !open ? 0 : `${ASIDE_MENU_WIDTH}px`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open
      ? {
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7),
          },
        }
      : {}),
  },
  [`& .${toolbarClasses.root}`]: {
    height: `${APP_BAR_HEIGHT}px !important`,
    minHeight: `${APP_BAR_HEIGHT}px !important`,
  },
}));

const ListStyled = styled(List, { shouldForwardProp: (p) => p !== "open" })<
  ListProps & { open?: boolean }
>(({ open, theme }) => ({
  transition: "all ease 0.3s",
  height: `calc(100% - ${APP_BAR_HEIGHT + 4 + ASIDE_BOTTOM_HEIGHT}px)`,
  padding: !open ? 0 : theme.spacing(0, 1.5),
}));

function AsideDrawer({ children }: { children?: ReactNode }) {
  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);
  return (
    <DrawerStyled
      variant="permanent"
      open={isAsideOpen}
      className="db-layout-left"
    >
      <ToolbarStyled>
        <AsideToggleButton />
      </ToolbarStyled>
      {/* <Divider /> */}
      <ListStyled component="nav" disablePadding open={isAsideOpen}>
        {children}
      </ListStyled>
      <AsideBottom />
    </DrawerStyled>
  );
}

const AsideMenu = memo(() => {
  return (
    <AsideDrawer>
      <AsideMenuList />
    </AsideDrawer>
  );
});

AsideMenu.displayName = "AsideMenu";

export default AsideMenu;
