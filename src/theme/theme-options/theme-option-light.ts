import baseThemeOptions from "./theme-option-base";
import type { ThemeOptions } from "@mui/material/styles";
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const lightThemeOptions: ThemeOptions = {
  typography: baseThemeOptions.typography,
  ...(!baseThemeOptions.shadows?.length
    ? {}
    : {
        shadows: baseThemeOptions.shadows,
      }),
  palette: {
    ...baseThemeOptions?.palette,
    mode: "light",
  },
  components: { ...baseThemeOptions.components },
  // TODO [MUI] custom dark theme here
};
export default lightThemeOptions;
