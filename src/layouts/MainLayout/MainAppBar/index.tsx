import type { AppBarProps } from "@mui/material/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar, { ToolbarProps } from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { memo, useMemo } from "react";
import { APP_BAR_HEIGHT, ASIDE_MENU_WIDTH } from "../constants";
import { useGetStateMainLayout } from "../context";
import ButtonLanguage from "./ButtonLanguage";
import ButtonMenu from "./ButtonMenu";
import PageTitle from "./PageTitle";

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps & { open?: boolean }>(({ theme, open }) => ({
  height: `${APP_BAR_HEIGHT}px !important`,
  zIndex: theme.zIndex.modal + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: ASIDE_MENU_WIDTH,
    width: `calc(100% - ${ASIDE_MENU_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ToolbarStyled = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  height: `${APP_BAR_HEIGHT}px !important`,
  width: "100%",
  minHeight: `${APP_BAR_HEIGHT}px !important`,
  paddingRight: `${theme.spacing(1)} !important`,
  paddingLeft: `${theme.spacing(1)} !important`,
  ...(theme.palette.mode === "light"
    ? {
        backgroundColor: theme.palette.primary.dark,
      }
    : {}),
}));

const MainAppBar = memo(() => {
  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);

  const $ButtonMenu = useMemo(() => <ButtonMenu />, []);

  const $PageTitle = useMemo(() => <PageTitle />, []);

  const $ButtonLanguage = useMemo(() => <ButtonLanguage />, []);

  return (
    <AppBarStyled
      position="absolute"
      open={isAsideOpen}
      id="main-layout-appbar-root"
    >
      <ToolbarStyled sx={{ background: "transparent" }}>
        {$ButtonMenu}
        {$PageTitle}
        {$ButtonLanguage}
      </ToolbarStyled>
    </AppBarStyled>
  );
});

MainAppBar.displayName = "MainAppBar";

export default MainAppBar;
