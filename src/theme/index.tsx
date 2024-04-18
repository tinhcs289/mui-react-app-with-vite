import type { PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import darkThemeOptions from "./theme-options/theme-option-dark";
import lightThemeOptions from "./theme-options/theme-option-light";

export { default as globalStyleMaker } from "./styles-makers";

export const THEMES: Partial<Record<PaletteMode, Theme>> = {
  light: createTheme(lightThemeOptions),
  dark: createTheme(darkThemeOptions),
};
