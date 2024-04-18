import { styled } from "@mui/material";
import type { CommonFallbackProps } from "./CommonFallback";
import CommonFallback from "./CommonFallback";

const FallbackStyled = styled(CommonFallback)<CommonFallbackProps>(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  })
);

export type RouteFallbackProps = CommonFallbackProps;

export default function RouteFallback({
  children,
  ...otherProps
}: RouteFallbackProps) {
  return <FallbackStyled {...otherProps}>{children}</FallbackStyled>;
}
