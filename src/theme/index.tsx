import { i18nLanguage } from "@/browser/local-storage/acceptLanguage";
import { DATETIME_LOCALE, LANGUAGE_DEFAULT } from "@/constants/language";
import type { PaletteMode, Theme } from "@mui/material";
import * as locales from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import * as pickerLocales from "@mui/x-date-pickers/locales";
import darkThemeOptions from "./theme-options/theme-option-dark";
import lightThemeOptions from "./theme-options/theme-option-light";

type ThemeLocales = keyof typeof locales;

type PickerLocales = keyof typeof pickerLocales;

const locale = DATETIME_LOCALE[i18nLanguage.get() || LANGUAGE_DEFAULT];

export { default as globalStyleMaker } from "./styles-makers";

export const THEMES: Partial<Record<PaletteMode, Theme>> = {
  light: createTheme(
    lightThemeOptions,
    locales[locale as ThemeLocales],
    pickerLocales[locale as PickerLocales]
  ),
  dark: createTheme(
    darkThemeOptions,
    locales[locale as ThemeLocales],
    pickerLocales[locale as PickerLocales]
  ),
};
