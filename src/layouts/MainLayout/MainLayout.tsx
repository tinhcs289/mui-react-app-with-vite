import { styled, useMediaQuery, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Toolbar, { toolbarClasses } from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import AsideMenu from "./AsideMenu";
import { APP_BAR_HEIGHT, ASIDE_MENU_WIDTH } from "./constants";
import { MainLayoutStatesProvider, useGetStateMainLayout } from "./context";
import MainAppBar from "./MainAppBar";
import { useMemo } from "react";

const BoxRoot = styled(Box)<BoxProps>({
  height: "100%",
  display: "flex",
  margin: 0,
  padding: 0,
});

const BoxMain = styled(({ children, sx, ...props }: BoxProps) => {
  const theme = useTheme();
  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);
  const isLargerThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const asideWidth = useMemo(
    () =>
      `${
        isAsideOpen
          ? `${ASIDE_MENU_WIDTH}px`
          : isLargerThanSmallScreen
          ? theme.spacing(7)
          : "0"
      }`,
    [isAsideOpen, isLargerThanSmallScreen, theme]
  );

  return (
    <Box {...props} sx={{ width: `calc(100svw - ${asideWidth})`, ...sx }}>
      {children}
    </Box>
  );
})<BoxProps<"main">>(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100svh",
  position: "relative",
  overflowX: "auto",
  overflowY: "hidden",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  [`& .${toolbarClasses.root}`]: {
    height: `${APP_BAR_HEIGHT}px !important`,
    minHeight: `${APP_BAR_HEIGHT}px !important`,
  },
}));

const BoxContent = styled(Box)<BoxProps>({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  height: `calc(100svh - ${APP_BAR_HEIGHT}px)`,
  width: "100%",
  overflow: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

export default function MainLayout() {
  const $Page = useMemo(
    () => (
      <>
        <Toolbar sx={{ background: "transparent", width: "100%" }} />
        <BoxContent id="page-content-root" className="page-content">
          <Outlet />
        </BoxContent>
      </>
    ),
    []
  );

  return (
    <MainLayoutStatesProvider>
      <BoxRoot id="main-layout-root" className="main-layout">
        <MainAppBar />
        <AsideMenu />
        <BoxMain component="main" id="page-main-root" className="page-main">
          {$Page}
        </BoxMain>
      </BoxRoot>
    </MainLayoutStatesProvider>
  );
}
