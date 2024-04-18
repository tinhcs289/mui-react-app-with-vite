import themeVariant from "@/browser/local-storage/themeVariant";
import { globalStyleMaker, THEMES } from "@/theme";
import type { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStylesProps from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import type { ThemeProviderProps } from "@mui/system";
import isEqual from "lodash/isEqual";
import { useEffect, useMemo, useRef, useState } from "react";
import FabChangeTheme from "./FabChangeTheme";

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, "theme">;

export default function MUIThemeV5Provider(
  props: MUIThemeV5ProviderProps<any>
) {
  const { children, ...otherProps } = props;
  const [mode, setMode] = useState<PaletteMode>(themeVariant.get() || "light");
  const modeRef = useRef(mode);
  useEffect(() => {
    if (isEqual(modeRef.current, mode)) return;
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    themeVariant.onChange((_, detail) => {
      if (!detail?.value || isEqual(detail.value, modeRef.current)) return;
      setMode(detail.value);
    });
  }, []);
  const $SwitchThemeFab = useMemo(() => {
    return <FabChangeTheme mode={mode} />;
  }, [mode]);
  const memoTheme = useMemo(() => {
    return THEMES[mode];
  }, [mode]);
  return (
    <ThemeProvider {...otherProps} theme={memoTheme as any}>
      <CssBaseline />
      <GlobalStylesProps styles={globalStyleMaker} />
      {children}
      {$SwitchThemeFab}
    </ThemeProvider>
  );
}
