import { appbarStyleMaker } from "@/theme/styles-makers/style-maker-appbar";
import { asideStyleMaker } from "@/theme/styles-makers/style-maker-aside";
import type { FunctionInterpolation } from "@emotion/react";
import type { GlobalStylesProps, Theme } from "@mui/material";

const globalStyleMaker: Required<GlobalStylesProps>["styles"] = (theme) => ({
  "div.db-layout-root": {
    "& > header.MuiAppBar-root.db-layout-top": (
      appbarStyleMaker as FunctionInterpolation<Theme>
    )(theme),
    "& > div.MuiDrawer-root.db-layout-left": (
      asideStyleMaker as FunctionInterpolation<Theme>
    )(theme),
    "& > main.MuiBox-root.db-layout-right": {
      // Right Content
      "̃& > div.MuiBox-root.db-page-content": {
        // Page Content
      },
    },
  },
});
export default globalStyleMaker;
