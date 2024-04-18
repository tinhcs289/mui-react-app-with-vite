import baseThemeOptions from "./theme-option-base";
import type { ThemeOptions } from "@mui/material/styles";
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const lightThemeOptions: ThemeOptions = {
  shadows: baseThemeOptions.shadows,
  typography: baseThemeOptions.typography,
  components: baseThemeOptions.components,
  // TODO [MUI] custom light theme here
};
export default lightThemeOptions;
