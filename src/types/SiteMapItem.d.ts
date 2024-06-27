import type { MuiIcon, MuiIconProps } from "@/types";
import type { BaseOn } from "@/types/AnyObject";
import type { NavLinkProps } from "@/types/NavLinkProps";
import type { SvgIconTypeMap } from "@mui/material";
import type { ListItemProps } from "@mui/material/ListItem";
import type { ListItemIconProps } from "@mui/material/ListItemIcon";
import type { ListItemTextProps } from "@mui/material/ListItemText";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType, ReactNode } from "react";

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
type SvgImage = ComponentType<
  SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>
>;
export type SiteMapItemIcon = MuiIcon | SvgImage | ReactNode;
export type SiteMapItemIconProps = SvgIconProps<
  SvgIconTypeMap["defaultComponent"],
  {}
>;
export type SiteMapItem = BaseOn<{
  id: string;
  label?: ReactNode;
  labelText?: string;
  url?: string;
  matchExact?: boolean;
  icon?: SiteMapItemIcon;
  iconProps?: SiteMapItemIconProps;
  linkProps?: NavLinkProps;
  childs?: SiteMapItem[];
}>;

export type MenuItemType = "link" | "label" | "divider";

export type MenuItemData = {
  id: string;
  type: MenuItemType;
  label?: ReactNode;
  labelText?: string;
  url?: string;
  matchExact?: boolean;
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
