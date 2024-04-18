import type { MuiIcon, MuiIconProps, NavLinkProps } from "@/types";
import type { ListItemProps } from "@mui/material/ListItem";
import type { ListItemIconProps } from "@mui/material/ListItemIcon";
import type { ListItemTextProps } from "@mui/material/ListItemText";
import type { ReactNode } from "react";

export type MenuItemType = "link" | "label" | "divider";

export type MenuItemData = {
  id: string;
  type: MenuItemType;
  label?: ReactNode;
  labelText?: string;
  url?: string;
  childs?: MenuItemData[];
  Icon?: MuiIcon;
  slotProps?: {
    root?: Partial<Omit<ListItemProps, "href">>;
    iconWrapper?: Partial<ListItemIconProps>;
    icon?: Partial<MuiIconProps>;
    label?: Partial<ListItemTextProps>;
    link?: Partial<NavLinkProps>;
  };
  // ----------------------------------------------
  /**
   * @deprecated do not set this property manually
   */
  active?: boolean;
  /**
   * @deprecated do not set this property manually
   */
  openSubMenu?: boolean;
};
