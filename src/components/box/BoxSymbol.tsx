import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

/**
 * @see https://fonts.google.com/icons
 */

export default function BoxSymbol({
  children,
  className = "",
  ...otherProps
}: BoxProps<"span">) {
  return (
    <Box
      component="span"
      className={`material-symbols-outlined ${className}`}
      {...otherProps}
    >
      {children}
    </Box>
  );
}
