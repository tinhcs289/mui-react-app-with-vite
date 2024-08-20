import { InputProps, styled } from "@mui/material";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";
import type { DOMAttributes } from "react";
import { useCallback, useRef, useState } from "react";

const BoxRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFocused",
})<BoxProps & { isFocused?: boolean }>(({ theme, isFocused }) => ({
  cursor: "pointer",
  width: "100%",
  minHeight: theme.spacing(6),
  background: isFocused
    ? theme.palette.background.paper
    : theme.palette.grey[200],
  borderRadius: theme.spacing(0.5),
  position: "relative",
  padding: theme.spacing(1),
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  ":after": {
    transition: "all ease .4s",
    position: "absolute",
    display: "block",
    content: "''",
    background: "transparent",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    borderRadius: theme.spacing(0.75),
    transform: "translateX(-50%) translateY(-50%)",
    border: `${theme.spacing(0.25)} solid ${
      isFocused ? theme.palette.primary.main : "transparent"
    }`,
    overflow: "unset",
  },
  ":hover::after": {
    border: `${theme.spacing(0.25)} solid ${theme.palette.primary.main}`,
  },
}));

const BoxLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFocused",
})<BoxProps<"label"> & { isFocused?: boolean }>(({ theme, isFocused }) => ({
  width: "100%",
  boxSizing: "border-box",
  // border: `1px solid ${theme.palette.grey[400]}`,
  height: theme.spacing(2),
  lineHeight: theme.spacing(1.75),
  fontSize: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  color: isFocused ? theme.palette.primary.main : theme.palette.grey[600],
  fontWeight: 600,
  transition: "all ease .4s",
  marginBottom: theme.spacing(0.5),
}));

const BoxInput = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  // border: `1px solid ${theme.palette.grey[400]}`,
  minHeight: theme.spacing(2.5),
  "& > input": {
    padding: 0,
    zIndex: 1,
    width: "100%",
    background: "transparent",
    color: theme.palette.grey[800],
    fontWeight: 300,
    fontSize: theme.spacing(2),
    minHeight: theme.spacing(2.25),
    lineHeight: theme.spacing(2.25),
    border: "none",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.grey[300],
    },
  },
}));

const BoxControl = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100%",
  width: `calc(100% - ${theme.spacing(8)})`,
  padding: theme.spacing(0, 1),
}));

const BoxStartAdornment = styled(Box)<BoxProps>(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  boxSizing: "border-box",
  // border: `1px solid ${theme.palette.grey[400]}`,
}));

const BoxEndAdornment = styled(Box)<BoxProps>(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  boxSizing: "border-box",
  // border: `1px solid ${theme.palette.grey[400]}`,
}));

type NativeInputProps = Partial<
  Omit<DOMAttributes<HTMLInputElement>, "children">
>;

type SlotProps = {
  rootWrapper: Partial<BoxProps<"div">>;
  startAddornmentWrapper?: Partial<BoxProps<"div">>;
  endAddornmentWrapper?: Partial<BoxProps<"div">>;
  controlWrapper?: Partial<BoxProps<"div">>;
  label?: Partial<BoxProps<"label">>;
};

export type TextBoxProps = {
  inputProps?: NativeInputProps;
};

export default function TextBox({
  onMouseOver,
  onMouseLeave,
  inputProps,
  ...otherProps
}: TextBoxProps) {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [isInputFocused, setInputFocused] = useState<boolean>(false);

  const handleMouseOver: Required<BoxProps>["onMouseOver"] = useCallback(
    (...args) => {
      setFocused(true);
      onMouseOver?.(...args);
    },
    [onMouseOver]
  );

  const handleMouseLeave: Required<BoxProps>["onMouseLeave"] = useCallback(
    (...args) => {
      if (!isInputFocused) setFocused(false);
      onMouseLeave?.(...args);
    },
    [onMouseLeave, isInputFocused]
  );

  const handleInputFocus: Required<InputProps>["onFocus"] = useCallback(
    (...args) => {
      setFocused(true);
      setInputFocused(true);
      // @ts-ignore
      inputProps?.onFocus?.(...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputProps?.onFocus]
  );

  const handleInputBlur: Required<InputProps>["onBlur"] = useCallback(
    (...args) => {
      setFocused(false);
      setInputFocused(false);
      // @ts-ignore
      inputProps?.onBlur?.(...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputProps?.onBlur]
  );

  const handleRootClick: Required<BoxProps>["onClick"] = useCallback(
    (event) => {
      const inputElement = (event?.target as Element)?.querySelector?.(
        "input"
      ) as HTMLInputElement;

      if (inputElement) {
        inputElement.focus();
      }
    },
    []
  );

  return (
    <BoxRoot
      component="div"
      onClick={handleRootClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      isFocused={isFocused}
      {...otherProps}
    >
      <BoxStartAdornment component="div"></BoxStartAdornment>
      <BoxControl component="div">
        <BoxLabel component="label" isFocused={isFocused}>
          Lorem Ipsum
        </BoxLabel>
        <BoxInput>
          <input
            {...inputProps}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </BoxInput>
      </BoxControl>
      <BoxEndAdornment component="div"></BoxEndAdornment>
    </BoxRoot>
  );
}
