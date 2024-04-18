import type { GlobalStylesProps } from "@mui/material";

export const appbarStyleMaker: Required<GlobalStylesProps>["styles"] = (
  theme
) => ({
  backgroundColor: theme.palette.background.paper,
  "& > div.MuiToolbar-root": {
    // Page title (only show if there're no Breadcrumbs)
    "& > h1.MuiTypography-root.db-page-title": {
      color: theme.palette.text.primary,
      fontWeight: 400,
    },
    // Breadcrumbs
    "& > nav.MuiBreadcrumbs-root": {
      "& li.MuiBreadcrumbs-separator": {
        color: theme.palette.text.primary,
      },
      "& li.MuiBreadcrumbs-li > a > .MuiTypography-root": {
        color: theme.palette.text.primary,
        ":hover": {
          color: theme.palette.primary.main,
          background: theme.palette.action.hover,
        },
      },
    },
    // Buttons
    "& > button.MuiButtonBase-root": {
      color: theme.palette.text.secondary,
      ":hover": {
        color: theme.palette.text.primary,
      },
    },
  },
});
