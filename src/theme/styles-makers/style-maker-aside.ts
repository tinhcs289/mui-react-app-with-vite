import { alpha } from "@mui/material";
import type { StyleMakerFn } from "@/types";
import { drawerClasses } from "@mui/material/Drawer";

const color = {
  nav: "rgb(20, 22, 23)",
  navDarker: "#172131",
  navItem: "#9DA4AE",
  navItemActiveBg: "rgba(255, 255, 255, 0.04)",
};

const activeAsideItemStyleMaker =
  (itemLevel: number = 1): StyleMakerFn =>
  (theme) => ({
    position: "relative",
    "::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "4px",
      background: alpha(theme.palette.primary.main, 1 / itemLevel),
    },
  });

export const asideStyleMaker: StyleMakerFn = (theme) => ({
  [`& > .${drawerClasses.paper}`]: {
    backgroundColor: color.nav,
    "& > div.MuiToolbar-root": {
      "& > button.MuiButtonBase-root > svg": {
        color: color.navItem,
        ":hover": {
          color: theme.palette.common.white,
        },
      },
    },
    // Dividers
    "& > hr.MuiDivider-root": {
      borderColor: alpha(theme.palette.common.white, 0.1),
    },
    // Menu items
    "& > nav.MuiList-root": {
      paddingTop: 0,
      paddingBottom: 0,
      "& .MuiDivider-root.MuiDivider-inset": {
        borderColor: alpha(theme.palette.common.white, 0.1),
      },
      "& .MuiListItemButton-root": {
        "& > .MuiListItemIcon-root": {
          minWidth: theme.spacing(5.25),
          color: color.navItem,
        },
        "& > .MuiListItemText-root": {
          "& > .MuiTypography-root": {
            color: color.navItem,
          },
        },
        "& > button.MuiButtonBase-root.MuiIconButton-root": {
          color: color.navItem,
        },
        "&.Mui-selected": {
          backgroundColor: color.navItemActiveBg,
          "& > .MuiListItemText-root": {
            "& > .MuiTypography-root": {
              color: theme.palette.common.white,
            },
          },
        },
        ":hover": {
          backgroundColor: color.navItemActiveBg,
        },
      },
      "& > div.MuiBox-root.active > a.active": {
        "& > div.MuiButtonBase-root": (activeAsideItemStyleMaker(1) as any)(
          theme
        ),
      },
      "& > a.active": {
        "& > div.MuiButtonBase-root": (activeAsideItemStyleMaker(1) as any)(
          theme
        ),
        "& + div.MuiCollapse-root": {
          background: color.navDarker,
          "& > div.MuiCollapse-wrapper > div.MuiCollapse-wrapperInner > div.MuiList-root":
            {
              ...(activeAsideItemStyleMaker(2) as any)(theme),
              "& > a.active": {
                "& > div.MuiButtonBase-root": (
                  activeAsideItemStyleMaker(1) as any
                )(theme),
              },
            },
        },
      },
    },
  },
});
