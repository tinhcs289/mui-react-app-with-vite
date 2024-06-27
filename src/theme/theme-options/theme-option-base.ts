import { FONT_SANS_SERIF, FONT_SIZE } from "@/constants/theme";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontSize: FONT_SIZE,
    fontFamily: FONT_SANS_SERIF,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: '${FONT_SANS_SERIF}';
        font-display: swap;
        font-weight-light: 300;
        font-weight-regular: 400,
        font-weight-medium: 500,
        font-weight-bold: 700,
      }
    `,
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 1304, // 1300 by default
        },
      },
    },
  },
  // TODO [MUI] base theme here
};
export default baseThemeOptions;
