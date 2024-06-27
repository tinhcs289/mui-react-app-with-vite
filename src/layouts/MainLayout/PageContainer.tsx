import type { Breakpoint } from "@mui/material";
import { styled } from "@mui/material";
import type { ContainerProps } from "@mui/material/Container";
import Container from "@mui/material/Container";
import { forwardRef, useMemo } from "react";
import { APP_BAR_HEIGHT, DEFAULT_WIDTH, MODIFIABLE_WIDTH } from "./constants";
import { useGetStateMainLayout } from "./context";

const ContainerStyled = styled(Container)<ContainerProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  height: `calc(100svh - ${APP_BAR_HEIGHT}px)`,
  padding: 0,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
  },
}));

const PageContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, maxWidth: maxWidthProp, ...otherProps }, ref) => {
    const pageMaxWidth = useGetStateMainLayout((s) => s.pageMaxWidth);
    const maxWidth = useMemo(
      () =>
        maxWidthProp ||
        ((!MODIFIABLE_WIDTH
          ? "sx"
          : pageMaxWidth || DEFAULT_WIDTH) as Breakpoint),
      [maxWidthProp, pageMaxWidth]
    );
    return (
      <ContainerStyled ref={ref} maxWidth={maxWidth} {...otherProps}>
        {children}
      </ContainerStyled>
    );
  }
);
PageContainer.displayName = "PageContainer";
export default PageContainer;
