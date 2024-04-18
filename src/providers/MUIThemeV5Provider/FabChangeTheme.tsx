import themeVariant from "@/browser/local-storage/themeVariant";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import type { PaletteMode, SxProps } from "@mui/material";
import { useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import type { CSSProperties } from "react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const fabStyle: SxProps = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

export default function FabChangeTheme(props: { mode?: PaletteMode }) {
  const { mode } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const zoomProps = useMemo(
    () => ({
      timeout: {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      },
      style: {
        transitionDelay: `${theme.transitions.duration.leavingScreen}ms`,
      } as CSSProperties,
    }),
    [theme]
  );
  const handleChangeTheme = useCallback((variant: PaletteMode) => {
    return () => {
      themeVariant.set(variant);
    };
  }, []);
  const switchThemeButton = useMemo(() => {
    if (mode === "light")
      return (
        <Zoom in {...zoomProps}>
          <Fab
            color="primary"
            size="small"
            title={t("theme:dark") as string}
            onClick={handleChangeTheme("dark")}
            sx={fabStyle}
          >
            <DarkModeIcon />
          </Fab>
        </Zoom>
      );
    if (mode === "dark")
      return (
        <Zoom in {...zoomProps}>
          <Fab
            color="primary"
            size="small"
            title={t("theme:light") as string}
            onClick={handleChangeTheme("light")}
            sx={fabStyle}
          >
            <LightModeIcon />
          </Fab>
        </Zoom>
      );
    return null;
  }, [t, mode, handleChangeTheme, zoomProps]);
  return switchThemeButton;
}
