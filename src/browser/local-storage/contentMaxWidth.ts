import { newLocalStorageListenableItem } from "@/helpers/localstorage-helpers";
import type { Breakpoint } from "@mui/material";

const contentMaxWidth = newLocalStorageListenableItem<Breakpoint>({
  key: "contentMaxWidth",
});
export default contentMaxWidth;
