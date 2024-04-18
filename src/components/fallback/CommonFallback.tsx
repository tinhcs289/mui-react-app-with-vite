import { styled } from "@mui/material";
import type { BackdropProps } from "@mui/material/Backdrop";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BackdropStyled = styled(Backdrop, {
  shouldForwardProp: (p) => p !== "absolute",
})<BackdropProps & { absolute?: boolean }>(({ theme, absolute = false }) => ({
  color: "#fff",
  zIndex: theme.zIndex.drawer + 1,
  ...(absolute ? { position: "absolute" } : {}),
}));

export type CommonFallbackProps = Omit<BackdropProps, "open"> & {
  icon?: JSX.Element;
  absolute?: boolean;
};

export default function CommonFallback(props: CommonFallbackProps) {
  const { icon, children, absolute = false, ...otherProps } = props;
  return (
    <BackdropStyled open absolute={absolute} {...otherProps}>
      {icon || <CircularProgress color="inherit" />}
      {children}
    </BackdropStyled>
  );
}
