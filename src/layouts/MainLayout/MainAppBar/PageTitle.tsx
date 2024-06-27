import type { TypographyCommonProps } from "@/components/typo/TypographyCommon";
import TypographyCommon from "@/components/typo/TypographyCommon";
import { alpha, styled, useMediaQuery, useTheme } from "@mui/material";
import type { BreadcrumbsProps } from "@mui/material/Breadcrumbs";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useGetStateMainLayout } from "../context";

const LabelBreadcrumb = styled(TypographyCommon, {
  shouldForwardProp: (p) => p !== "isLast",
})<TypographyCommonProps & { isLast?: boolean }>(({ theme, isLast }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  opacity: isLast ? 1 : 0.7,
  color: theme.palette.text.primary,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 400,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  textDecorationLine: "none",
  ":hover": {
    opacity: 1,
    background: alpha(theme.palette.grey[200], 0.2),
    textDecorationLine: "none",
  },
}));

const BreadcrumbsStyled = styled(Breadcrumbs)<BreadcrumbsProps>({
  flex: 1,
  ".MuiBreadcrumbs-separator": {
    color: "HighlightText",
    fontWeight: 700,
  },
});

const PageTitle = memo(() => {
  const theme = useTheme();
  const isSmallScreenOrLarger = useMediaQuery(theme.breakpoints.up("sm"));

  const pageTitle = useGetStateMainLayout((s) => s?.pageTitle);
  const breadcrumb = useGetStateMainLayout((s) => s?.rootBreadcrumb);

  const shouldShowBreadcrumbs = useMemo(() => {
    if (!isSmallScreenOrLarger) return false;
    if (!breadcrumb) return false;
    if (!Array.isArray(breadcrumb)) return false;
    if (breadcrumb.length === 0) return false;
    return true;
  }, [isSmallScreenOrLarger, breadcrumb]);

  const $Title = useMemo(() => {
    return (
      <TypographyCommon
        component="h1"
        variant="h6"
        color="inherit"
        maxLines={1}
        flexGrow={1}
      >
        {pageTitle}
      </TypographyCommon>
    );
  }, [pageTitle]);

  const $BreadcrumbsOrTitle = useMemo(() => {
    if (!shouldShowBreadcrumbs) return $Title;
    return (
      <BreadcrumbsStyled separator="›">
        {breadcrumb?.map?.((b, i) => {
          const isLast = i === breadcrumb.length - 1;

          const Icon = b?.Icon;

          return (
            <LabelBreadcrumb
              key={i}
              variant={isLast ? "h1" : "h6"}
              color="HighlightText"
              fontWeight={isLast ? 700 : 400}
              maxLines={1}
              isLast={isLast}
              {...(!isLast
                ? {
                    component: NavLink,
                    to: b?.url || "#",
                  }
                : {})}
            >
              {!Icon ? null : (
                <>
                  <Icon {...{ fontSize: "small", ...b?.slotProps?.icon }} />
                  &nbsp;&nbsp;
                </>
              )}
              {b?.labelText || ""}
            </LabelBreadcrumb>
          );
        })}
      </BreadcrumbsStyled>
    );
  }, [$Title, breadcrumb, shouldShowBreadcrumbs]);

  return $BreadcrumbsOrTitle;
});

PageTitle.displayName = "PageTitle";

export default PageTitle;
