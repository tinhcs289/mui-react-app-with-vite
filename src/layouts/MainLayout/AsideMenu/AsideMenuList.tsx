import BoxTooltip from "@/components/box/BoxTooltip";
import type { BoxTooltipProps } from "@/components/box/BoxTooltip";
import arrayOrEmpty from "@/helpers/format-helpers/arrayOrEmpty";
import stringOrEmpty from "@/helpers/format-helpers/stringOrEmpty";
import type { MenuItemData } from "@/types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Theme } from "@mui/material";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import type { MouseEventHandler, ReactNode } from "react";
import { memo, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useGetStateMainLayout, useSetStateMainLayout } from "../context";
import { tooltipClasses } from "@mui/material/Tooltip";

function AsideItemTooltip({
  children,
  tooltipProps,
  ...otherProps
}: BoxTooltipProps) {
  return (
    <BoxTooltip
      {...otherProps}
      tooltipProps={{
        placement: "right",
        ...tooltipProps,
        sx: {
          ...tooltipProps?.sx,
          [`& .${tooltipClasses.tooltip}`]: {
            background: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[10],
            // @ts-ignore
            ...tooltipProps?.sx?.[`& .${tooltipClasses.tooltip}`],
          },
        },
      }}
    >
      {children}
    </BoxTooltip>
  );
}

const ListItemButtonStyled = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    overflow: "hidden",
  })
);

function ToggleButton({
  open,
  ...otherProps
}: IconButtonProps & { open?: boolean }) {
  return (
    <IconButton {...otherProps} edge="end">
      {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );
}

function MenuItem(props: {
  data: MenuItemData;
  children?: ReactNode;
  active?: boolean;
  childActive?: boolean;
  open?: boolean;
  depth: number;
}) {
  const theme = useTheme();
  const { children } = props;
  const active = useMemo(() => !!props?.active, [props?.active]);
  const childActive = useMemo(() => !!props?.childActive, [props?.childActive]);

  const { Icon, slotProps, label, labelText, childs, ...item } = useMemo(
    () => props?.data || {},
    [props?.data]
  );

  const depth = useMemo(() => {
    return typeof props?.depth === "number" && !Number.isNaN(props?.depth)
      ? props.depth
      : 0;
  }, [props?.depth]);

  const setState = useSetStateMainLayout();

  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);

  const urlOfInteractMenuItem = useGetStateMainLayout(
    (s) => s.urlOfInteractMenuItem
  );

  const memoUrl = useMemo(
    () => stringOrEmpty(urlOfInteractMenuItem),
    [urlOfInteractMenuItem]
  );

  const listItemProps = useMemo(() => {
    return {
      selected: !!active || !!childActive,
      ...(depth > 0 && isAsideOpen
        ? { sx: { pl: theme.spacing(depth * 4) } }
        : {}),
    };
  }, [theme, active, depth, isAsideOpen, childActive]);

  const handleToggleSubMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      if (!item?.url) return;

      if (item.url === memoUrl) {
        setState({ urlOfInteractMenuItem: null });
        return;
      }

      setState({ urlOfInteractMenuItem: item.url });
      return;
    },
    [item, memoUrl, setState]
  );

  const linkProps = useMemo(() => {
    return {
      to: item?.url || "",
      style: { textDecoration: "none" },
      ...slotProps?.link,
    };
  }, [item?.url, slotProps?.link]);

  const isOpenSubMenu = useMemo(() => {
    return item?.url === memoUrl;
  }, [item?.url, memoUrl]);

  const activeTextProps = useMemo(() => {
    return {
      ...(active || childActive
        ? {
            primaryTypographyProps: {
              sx: { fontWeight: theme.typography.fontWeightBold },
            },
          }
        : {}),
    };
  }, [theme, active, childActive]);

  const activeIconProps = useMemo(() => {
    return {
      ...(active || childActive ? { color: "primary" } : {}),
    };
  }, [active, childActive]);

  const isMediumScreenOrLower = useMediaQuery((t: Theme) =>
    t?.breakpoints?.down?.("lg")
  );

  const handleClickItem = useCallback(() => {
    if (!isMediumScreenOrLower) return;
    if (!isAsideOpen) return;
    setState({ isAsideOpen: false });
  }, [isMediumScreenOrLower, isAsideOpen, setState]);

  return (
    <>
      <NavLink {...linkProps} onClick={handleClickItem as any}>
        <ListItemButtonStyled
          {...listItemProps}
          disableTouchRipple
          disableRipple
        >
          {!Icon ? null : (
            <ListItemIcon {...slotProps?.iconWrapper}>
              <Icon {...({ ...slotProps?.icon, ...activeIconProps } as any)} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={label || ""}
            {...activeTextProps}
            {...slotProps?.label}
            primaryTypographyProps={{
              noWrap: true,
              title: labelText || "",
              ...slotProps?.label?.primaryTypographyProps,
            }}
            sx={{ color: theme.palette.text.primary, ...slotProps?.label?.sx }}
          />
          {Array.isArray(childs) && childs.length > 0 ? (
            <ToggleButton open={isOpenSubMenu} onClick={handleToggleSubMenu} />
          ) : null}
        </ListItemButtonStyled>
      </NavLink>
      {children}
    </>
  );
}

const AsideMenuList = memo(() => {
  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);
  const menuItems = useGetStateMainLayout((s) => s?.menuItems);

  const asideMenuItems = useMemo(() => arrayOrEmpty(menuItems), [menuItems]);

  const isChildActive = useCallback((item?: MenuItemData) => {
    if (!item || !item?.url) return false;
    if (!(Array.isArray(item.childs) && item.childs.length > 0)) return false;
    if (item.childs.findIndex((c) => !!c.active) >= 0) return true;
    return false;
  }, []);

  const theme = useTheme();

  const $Menu = useMemo(() => {
    return (
      <>
        {asideMenuItems?.map?.((item) => {
          const isDivider = item?.type === "divider";
          if (isDivider) {
            return (
              <Divider
                variant="inset"
                component="li"
                key={item?.id}
                sx={{ ml: "0 !important" }}
              />
            );
          }
          const hasChilds =
            Array.isArray(item.childs) && item.childs.length > 0;
          if (!hasChilds) {
            return isAsideOpen ? (
              <MenuItem
                key={item.id}
                data={item}
                active={!!item.active}
                depth={0}
              />
            ) : (
              <AsideItemTooltip
                key={item.id}
                tooltipProps={{
                  title: item.labelText,
                }}
              >
                <MenuItem
                  key={item.id}
                  data={item}
                  active={!!item.active}
                  depth={0}
                />
              </AsideItemTooltip>
            );
          } else {
            const childActive = isChildActive(item);
            return isAsideOpen ? (
              <MenuItem
                key={item.id}
                data={item}
                childActive={childActive}
                active={!!item.active}
                depth={0}
              >
                <Collapse
                  in={!!item.openSubMenu}
                  timeout="auto"
                  unmountOnExit
                  sx={{ borderRadius: theme.spacing(1), overflow: "hidden" }}
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{ borderRadius: theme.spacing(1), overflow: "hidden" }}
                  >
                    {item?.childs?.map?.((child) => {
                      return (
                        <MenuItem
                          key={child.id}
                          data={child}
                          active={!!child.active}
                          depth={1}
                        />
                      );
                    })}
                  </List>
                </Collapse>
              </MenuItem>
            ) : (
              <AsideItemTooltip
                key={item.id}
                tooltipProps={{
                  placement: "right-start",
                  title: (
                    <List
                      component="div"
                      disablePadding
                      subheader={
                        <ListSubheader component="div">
                          {item?.label || ""}
                        </ListSubheader>
                      }
                    >
                      {item?.childs?.map?.((child) => {
                        return (
                          <MenuItem
                            key={child.id}
                            data={child}
                            active={!!child.active}
                            depth={1}
                          />
                        );
                      })}
                    </List>
                  ),
                }}
                className={
                  !!item?.active || !!childActive ? "active" : undefined
                }
              >
                <MenuItem
                  key={item.id}
                  data={item}
                  childActive={childActive}
                  active={!!item.active}
                  depth={0}
                />
              </AsideItemTooltip>
            );
          }
        })}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asideMenuItems, isAsideOpen, theme]);
  return $Menu;
});

AsideMenuList.displayName = "AsideMenuList";

export default AsideMenuList;
