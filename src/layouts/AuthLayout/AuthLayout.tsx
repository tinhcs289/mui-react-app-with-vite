import { default as authInLocalStorage } from "@/browser/local-storage/authentication";
import PATHS from "@/constants/paths";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { memo, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { SIDE_LAYOUT_BG } from "./constants";
import type { AuthLayoutProps } from "./types";

const NaviagteToMainPageWhenAuthenticationFullfilled = memo(() => {
  useEffect(() => {
    authInLocalStorage.onChange((_, detail) => {
      if (!detail?.value?.accessToken) return;
      window?.location?.replace?.(PATHS.dashboard);
    });
  }, []);
  return null;
});

NaviagteToMainPageWhenAuthenticationFullfilled.displayName =
  "NaviagteToMainPageWhenAuthenticationFullfilled";

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  margin: theme.spacing(2, 1),
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const GridBackgrounded = styled(Grid)<GridProps>(({ theme }) => ({
  backgroundImage: `url(${SIDE_LAYOUT_BG})`,
  backgroundRepeat: "no-repeat",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const GridSide = styled(Grid)<GridProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    "& > .MuiBox-root": {
      margin: `0 ${theme.spacing(10)}`,
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& > .MuiBox-root": {
      margin: `0 ${theme.spacing(20)}`,
    },
  },
  [theme.breakpoints.up("xl")]: {
    "& > .MuiBox-root": {
      margin: `0 ${theme.spacing(10)}`,
    },
  },
}));

const TwoSideLayout = memo(function TwoSideLayoutMemo() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <GridBackgrounded item xs={false} sm={4} md={5} xl={8} />
      <GridSide item xs={12} sm={8} md={7} xl={4}>
        <BoxStyled>
          <Outlet />
        </BoxStyled>
      </GridSide>
    </Grid>
  );
});

TwoSideLayout.displayName = "TwoSideLayout";

const FullwidthLayout = memo(function FullwidthLayoutMemo() {
  return (
    <Container component="main" maxWidth="xs">
      <BoxStyled>
        <Outlet />
      </BoxStyled>
    </Container>
  );
});

FullwidthLayout.displayName = "FullwidthLayout";

const AuthLayout = memo(function AuthLayoutMemo({ variant }: AuthLayoutProps) {
  const $Layout = useMemo(() => {
    if (variant === "fullWidth") return <FullwidthLayout />;
    if (variant === "side") return <TwoSideLayout />;
    return null;
  }, [variant]);
  return (
    <>
      {$Layout}
      <NaviagteToMainPageWhenAuthenticationFullfilled />
    </>
  );
});

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
