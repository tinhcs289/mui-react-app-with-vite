import type { StyleMakerFn } from "@/types";
import { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { iconButtonClasses } from "@mui/material/IconButton";
import { toolbarClasses } from "@mui/material/Toolbar";
import { typographyClasses } from "@mui/material/Typography";

export const appbarStyleMaker: StyleMakerFn = (theme) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  [`& > .${toolbarClasses.root}`]: {
    backgroundColor: "transparent",
    // Page title (only show if there're no Breadcrumbs)
    [`& > h1.${typographyClasses.root}`]: {
      color: theme.palette.text.primary,
    },
    // Breadcrumbs
    [`& > .${breadcrumbsClasses.root}`]: {
      [`& > .${breadcrumbsClasses.ol}`]: {
        [`& > .${breadcrumbsClasses.separator}`]: {
          color: theme.palette.text.primary,
        },
        [`& > .${breadcrumbsClasses.li}`]: {
          [`& > .${typographyClasses.root}`]: {},
        },
      },
    },
    [`& .${iconButtonClasses.root}`]: {
      color: theme.palette.text.secondary,
      ":hover": {
        color: theme.palette.text.primary,
      },
    },
  },
});
