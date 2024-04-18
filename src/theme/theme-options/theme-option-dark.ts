import baseThemeOptions from "./theme-option-base";
import type { ThemeOptions } from "@mui/material/styles";
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const darkThemeOptions: ThemeOptions = {
  shadows: baseThemeOptions.shadows,
  typography: baseThemeOptions.typography,
  palette: {
    mode: "dark",
  },
  components: baseThemeOptions.components,
  // TODO [MUI] custom dark theme here
};
export default darkThemeOptions;
