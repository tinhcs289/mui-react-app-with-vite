import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { TooltipProps } from "@mui/material/Tooltip";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";

const DefaultTooltip = styled(function HtmlTooltipStyled({
  className,
  ...props
}: TooltipProps) {
  return <Tooltip {...props} classes={{ popper: className }} />;
})(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "max-content",
    minWidth: "fit-content",
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const BoxWrap = forwardRef(function BoxForwardRef(
  { children, ...others }: BoxProps,
  ref?: any
) {
  return (
    <Box {...others} ref={ref}>
      {children}
    </Box>
  );
});

export type BoxTooltipProps = BoxProps & {
  innerRef?: Ref<unknown>;
  TooltipComponent?: typeof DefaultTooltip | ComponentType<any>;
  tooltipProps?: Partial<TooltipProps>;
};

export default function BoxTooltip({
  children,
  tooltipProps,
  TooltipComponent = DefaultTooltip,
  ...others
}: BoxTooltipProps) {
  return (
    <TooltipComponent {...tooltipProps} title={tooltipProps?.title || ""}>
      <BoxWrap {...others}>{children}</BoxWrap>
    </TooltipComponent>
  );
}
