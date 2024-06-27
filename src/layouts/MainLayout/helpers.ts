import newGuid from "@/helpers/string-helpers/newGuid";
import type { MenuItemData } from "@/types";

export const createItem = {
  link: (config: Partial<MenuItemData>) =>
    ({
      id: newGuid(),
      type: "link",
      ...config,
    } as MenuItemData),
  label: (config: Partial<MenuItemData>) =>
    ({
      id: newGuid(),
      type: "label",
      ...config,
    } as MenuItemData),
  divider: (config?: Partial<MenuItemData>) =>
    ({
      id: newGuid(),
      type: "divider",
      ...config,
    } as MenuItemData),
};
