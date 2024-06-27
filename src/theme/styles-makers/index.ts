import type { GlobalStylesProps } from "@mui/material";
import { appBarClasses } from "@mui/material/AppBar";
import { boxClasses } from "@mui/material/Box";
import { drawerClasses } from "@mui/material/Drawer";
import { appbarStyleMaker } from "./style-maker-appbar";
import { asideStyleMaker } from "./style-maker-aside";
import { scrollbarStyleMaker } from "./style-maker-scrollbar";
import { pageStyleMaker } from "./style.maker-page";

const ID = "main-layout-root";

const globalStyleMaker: Required<GlobalStylesProps>["styles"] = (theme) => ({
  "*": scrollbarStyleMaker(theme),
  [`#${ID}.${boxClasses.root}`]: {
    [`& > .${appBarClasses.root}`]: appbarStyleMaker(theme),
    [`& > .${drawerClasses.root}`]: asideStyleMaker(theme),
    [`& > main.${boxClasses.root}`]: pageStyleMaker(theme),
  },
});
export default globalStyleMaker;
