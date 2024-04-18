import { MuiIconProps } from "@/types";
import ErrorIcon from "@mui/icons-material/Error";
import type { Theme } from "@mui/material";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

export type BoxErrorIconProps = BoxProps & {
  slotProps?: {
    icon?: Partial<MuiIconProps>;
    text?: Partial<TypographyProps>;
  };
};

const TypographyError = styled(Typography)<TypographyProps>(
  (args: { theme: Theme }) => {
    const { theme } = args;
    return {
      position: "absolute",
      color: theme.palette.error.contrastText,
      background: theme.palette.error.main,
      padding: theme.spacing(0.5),
      borderRadius: theme.spacing(0.5),
      zIndex: 1,
      top: theme.spacing(3),
      right: "-50%",
      boxShadow: theme.shadows["3"],
      "::before": {
        position: "absolute",
        content: '""',
        display: "block",
        right: theme.spacing(2),
        top: theme.spacing(-0.5),
        width: 0,
        height: 0,
        borderLeft: `${theme.spacing(0.5)}px solid transparent`,
        borderRight: `${theme.spacing(0.5)}px solid transparent`,
        borderBottom: `${theme.spacing(0.5)}px solid ${
          theme.palette.error.main
        }`,
      },
      whiteSpace: "nowrap",
      userSelect: "none",
    };
  }
);

export function BoxErrorIcon({
  children,
  sx,
  slotProps,
  ...otherProps
}: BoxErrorIconProps) {
  return (
    <Box {...otherProps} sx={{ position: "relative", ...sx }}>
      <ErrorIcon color="error" fontSize="small" {...slotProps?.icon} />
      <TypographyError {...slotProps?.text}>{children}</TypographyError>
    </Box>
  );
}
