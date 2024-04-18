import { useGetStateMainLayout, useSetStateMainLayout } from "../context";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material";
import Divider from "@mui/material/Divider";
import type { DrawerProps } from "@mui/material/Drawer";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import type { ToolbarProps } from "@mui/material/Toolbar";
import Toolbar, { toolbarClasses } from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import type { ReactNode } from "react";
import { memo, useCallback, useMemo } from "react";
import { APP_BAR_HEIGHT, ASIDE_MENU_WIDTH } from "../constants";
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
      <Tooltip title="Mở rộng">
        <IconButton onClick={toggleAside}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
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
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (p) => p !== "open",
})<DrawerProps>(({ theme, open }) => ({
  ...(!open
    ? {
        zIndex: theme.zIndex.modal + 2,
      }
    : {}),
  [`& ${drawerClasses.paper}`]: {
    position: "relative",
    whiteSpace: "nowrap",
    width: `${ASIDE_MENU_WIDTH}px`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open
      ? {
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: 0,
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7),
          },
        }
      : {}),
  },
  [`& ${toolbarClasses.root}`]: {
    height: `${APP_BAR_HEIGHT}px !important`,
    minHeight: `${APP_BAR_HEIGHT}px !important`,
  },
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
      <Divider />
      <List component="nav">{children}</List>
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
