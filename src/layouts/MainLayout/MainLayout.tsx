import type { Breakpoint } from "@mui/material";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ContainerProps } from "@mui/material/Container";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { forwardRef, useMemo } from "react";
import { Outlet } from "react-router-dom";
import AsideMenu from "./AsideMenu";
import {
  APP_BAR_HEIGHT,
  DEFAULT_WIDTH,
  LAYOUT_PADDING,
  MODIFIABLE_WIDTH,
  PAGE_HEIGHT,
} from "./constants";
import { MainLayoutStatesProvider, useGetStateMainLayout } from "./context";
import MainAppBar from "./MainAppBar";

const BoxRoot = styled(Box)<BoxProps>({
  display: "flex",
  overflowY: "hidden",
  margin: 0,
  padding: 0,
});

const BoxMain = styled(Box)<BoxProps<"main">>(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflowX: "auto",
  overflowY: "hidden",
  "& .MuiToolbar-root": {
    height: `${APP_BAR_HEIGHT}px !important`,
    minHeight: `${APP_BAR_HEIGHT}px !important`,
  },
  display: "flex",
  flexDirection: "column",
}));

const BoxContent = styled(Box)<BoxProps>({
  margin: 0,
  padding: 0,
  height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
  overflow: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

export default function MainLayout() {
  return (
    <MainLayoutStatesProvider>
      <BoxRoot id="main-layout-root" className="main-layout">
        <MainAppBar />
        <AsideMenu />
        <BoxMain component="main" id="page-main-root" className="page-main">
          <Toolbar />
          <BoxContent id="page-content-root" className="page-content">
            <Outlet />
          </BoxContent>
        </BoxMain>
      </BoxRoot>
    </MainLayoutStatesProvider>
  );
}

const PageContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  padding: `0 !important`,
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  height: PAGE_HEIGHT,
  [theme.breakpoints.up("sm")]: {
    padding: `${LAYOUT_PADDING}px !important`,
  },
}));

export const MainLayoutPageContainer = forwardRef<
  HTMLDivElement,
  ContainerProps
>(function MainLayoutPageContainer({ children, ...otherProps }, ref) {
  const pageMaxWidth = useGetStateMainLayout((s) => s.pageMaxWidth);
  const maxWidth = useMemo(
    () =>
      (!MODIFIABLE_WIDTH ? "sx" : pageMaxWidth || DEFAULT_WIDTH) as Breakpoint,
    [pageMaxWidth]
  );
  return (
    <PageContainer ref={ref} maxWidth={maxWidth} {...otherProps}>
      {children}
    </PageContainer>
  );
});
