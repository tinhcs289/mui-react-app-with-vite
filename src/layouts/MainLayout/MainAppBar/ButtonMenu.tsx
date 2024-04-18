import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { styled } from "@mui/material";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { memo, useCallback, useMemo } from "react";
import { useGetStateMainLayout, useSetStateMainLayout } from "../context";

const IconButtonStyled = styled(IconButton, {
  shouldForwardProp: (p) => p !== "show",
})<IconButtonProps & { show?: boolean }>(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginLeft: 0,
}));

const ButtonMenu = memo(() => {
  const setState = useSetStateMainLayout();
  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);

  const toggle = useCallback(() => {
    setState((states) => ({ isAsideOpen: !states?.isAsideOpen }));
  }, [setState]);

  const $Button = useMemo(() => {
    return (
      <Tooltip title="Thu gọn">
        <IconButtonStyled
          edge="start"
          color="inherit"
          onClick={toggle}
          show={isAsideOpen}
        >
          <MenuOpenIcon />
        </IconButtonStyled>
      </Tooltip>
    );
  }, [toggle, isAsideOpen]);

  return $Button;
});

ButtonMenu.displayName = "ButtonMenu";
export default ButtonMenu;