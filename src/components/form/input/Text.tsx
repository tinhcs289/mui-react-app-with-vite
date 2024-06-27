import BoxErrorIcon from "@/components/box/BoxErrorIcon";
import type { RHFInputProps, RHFRenderInput } from "@/types";
import InputAdornment from "@mui/material/InputAdornment";
import type { TextFieldProps } from "@mui/material/TextField";
import type { ComponentType, ReactNode } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { TextStyled, textClasses } from "./Text.styled";

type TextProps = TextFieldProps & {
  errorText?: ReactNode;
  StyledComponent?: typeof TextStyled | ComponentType<any>;
};

const Text = forwardRef<HTMLDivElement, TextProps>(function ForwardRef(
  props,
  ref
) {
  const {
    errorText,
    error,
    inputProps,
    InputProps,
    StyledComponent = TextStyled,
    onFocus,
    onBlur,
    InputLabelProps,
    className,
    ...otherProps
  } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus: Required<TextProps>["onFocus"] = useCallback(
    (e) => {
      setTimeout(() => {
        setFocused(true);
      }, 0);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleOutFocus: Required<TextProps>["onBlur"] = useCallback(
    (e) => {
      setTimeout(() => {
        setFocused(false);
      }, 0);
      onBlur?.(e);
    },
    [onBlur]
  );

  const memoInputLabelProps: Required<TextProps>["InputLabelProps"] =
    useMemo(() => {
      return {
        ...(InputLabelProps as any),
        shrink:
          typeof InputLabelProps?.shrink === "boolean"
            ? Boolean(InputLabelProps.shrink)
            : !!(focused || props?.placeholder || props?.value),
      };
    }, [InputLabelProps, focused, props?.value, props?.placeholder]);

  const memoClassName = useMemo(() => {
    let cls = className || "";
    if (InputProps?.startAdornment) cls = `${textClasses.hasStartIcon} ${cls}`;
    if (props?.multiline) cls = `${textClasses.textarea} ${cls}`;
    return cls;
  }, [className, props?.multiline, InputProps?.startAdornment]);

  return (
    <StyledComponent
      size="small"
      margin="none"
      color="primary"
      ref={ref}
      fullWidth
      error={!!error}
      className={memoClassName}
      inputProps={{ ...inputProps, notched: `${!!inputProps?.notched}` }}
      InputLabelProps={memoInputLabelProps}
      InputProps={{
        ...InputProps,
        ...(error === true && !!errorText
          ? {
              endAdornment: (
                <>
                  {InputProps?.endAdornment}
                  <InputAdornment position="end">
                    <BoxErrorIcon>{errorText}</BoxErrorIcon>
                  </InputAdornment>
                </>
              ),
            }
          : {}),
      }}
      onFocus={handleFocus}
      onBlur={handleOutFocus}
      {...otherProps}
    />
  );
}) as ComponentType<TextProps>;

type RHFTextProps = RHFInputProps &
  Omit<
    TextProps,
    | "name"
    | "defaultValue"
    | "value"
    | "error"
    | "errorText"
    | "onChange"
    | "required"
  > & {
    defaultValue?: string;
  };

function RHFText(props: RHFTextProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    ...inputProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, ref },
      fieldState: { invalid, error },
    }) => (
      <Text
        name={name as string}
        value={value || ""}
        {...(defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        {...inputProps}
        required={!!rules?.required}
        errorText={error?.message ?? undefined}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, rules?.required, inputProps, defaultValue]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === "boolean" ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}

export default Text;
export { RHFText, textClasses };
export type { RHFTextProps, TextProps };
