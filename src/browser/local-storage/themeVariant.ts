import { newLocalStorageListenableItem } from "@/helpers/localstorage-helpers";
import type { PaletteMode } from "@mui/material";

const themeVariant = newLocalStorageListenableItem<PaletteMode>({
  key: "themeVariant",
});
export default themeVariant;
