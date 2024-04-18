/* eslint-disable @typescript-eslint/ban-types */
import type { BaseOn } from "@/types/AnyObject";
import type { NavLinkProps } from "@/types/NavLinkProps";
import type { SvgIconTypeMap } from "@mui/material";
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
