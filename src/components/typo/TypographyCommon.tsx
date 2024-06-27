import { styled } from "@mui/material";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import type { ElementType } from "react";

export type TypographyCommonProps<D extends ElementType<any> = "span"> = Omit<
  TypographyProps<D>,
  "lineHeight"
> & {
  clickable?: boolean;
  maxLines?: number;
  lineHeight?: number | `${number}rem` | `${number}px` | `${number}em`;
  breakSpaces?: boolean;
};

const TypographyCommon = styled(Typography, {
  shouldForwardProp: (p) =>
    p !== "maxLines" &&
    p !== "lineHeight" &&
    p !== "breakSpaces" &&
    p !== "clickable",
})<TypographyCommonProps>(
  ({ maxLines, lineHeight, breakSpaces, clickable }) => {
    let lineHeightValue = 0;
    let lineHeightUnit = "px";
    if (typeof lineHeight === "string") {
      ["rem", "em", "px"].forEach((u) => {
        if (lineHeight.indexOf(u) === -1) return;
        lineHeightUnit = u;
        lineHeightValue = +lineHeight.replace(u, "");
      });
    }

    return {
      lineHeight: lineHeight || "inherit",
      ...(maxLines === 1
        ? {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }
        : {}),
      ...(!!maxLines && !!lineHeightValue && maxLines > 1
        ? {
            lineHeight: `${lineHeightValue}${lineHeightUnit}`,
            height: `${lineHeightValue * maxLines}${lineHeightUnit}`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
          }
        : {}),
      ...(!!breakSpaces ? { whiteSpace: "break-spaces" } : {}),
      ...(!!clickable ? { cursor: "pointer" } : {}),
    };
  }
) as <D extends ElementType<any> = "span">(
  props: TypographyCommonProps<D>
) => JSX.Element;
export default TypographyCommon;
