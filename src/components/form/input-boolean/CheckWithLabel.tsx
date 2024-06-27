import type { BoxErrorIconProps } from "@/components/box/BoxErrorIcon";
import BoxErrorIcon from "@/components/box/BoxErrorIcon";
import type { FormGroupCommonProps } from "@/components/form/form-group/FormGroupCommon";
import FormGroupCommon from "@/components/form/form-group/FormGroupCommon";
import type { TypographyCommonProps } from "@/components/typo/TypographyCommon";
import TypographyCommon from "@/components/typo/TypographyCommon";
import WithRequiredMark from "@/components/typo/WithRequiredMark";
import type { MuiSx, RHFInputProps, RHFRenderInput } from "@/types";
import { useTheme } from "@mui/material";
import type { ButtonBaseActions } from "@mui/material/ButtonBase";
import type { CheckboxProps } from "@mui/material/Checkbox";
import Checkbox from "@mui/material/Checkbox";
import type { ChangeEvent, ComponentType, ReactNode } from "react";
import { forwardRef, useCallback, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";

type CheckWithLabelProps = Omit<FormGroupCommonProps, "slotProps"> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputRef?: CheckboxProps["inputRef"];
  inputProps?: Omit<
    CheckboxProps,
    "checked" | "error" | "onChange" | "value" | "name" | "inputRef" | "action"
  >;
  /**
   * @default true
   */
  eventStopPropagation?: boolean;
  /**
   * @default false
   */
  eventPreventDefault?: boolean;
  slotProps?: FormGroupCommonProps["slotProps"] & {
    labelTypography?: Partial<TypographyCommonProps<"label">>;
    error?: Partial<BoxErrorIconProps>;
  };
};

function ErrorText({
  sx,
  children,
  slotProps = {},
  ...props
}: BoxErrorIconProps) {
  const { text: textProps, ...otherSlotProps } = slotProps;
  return (
    <BoxErrorIcon
      {...props}
      sx={{ display: "flex", ...sx }}
      slotProps={{
        ...otherSlotProps,
        text: {
          ...textProps,
          sx: {
            ...textProps?.sx,
            right: "unset",
            left: "-50%",
          },
        },
      }}
    >
      {children}
    </BoxErrorIcon>
  );
}

function CheckWithLabelBase(props: CheckWithLabelProps) {
  const {
    name,
    label,
    error,
    checked,
    value,
    onChange,
    errorText,
    required,
    inputRef,
    inputProps,
    eventStopPropagation = true,
    eventPreventDefault = false,
    slotProps = {},
    sx,
    ...formControlProps
  } = props;
  const theme = useTheme();

  const {
    error: errorProps,
    label: labelRootProps,
    labelTypography: labelProps,
    control: controlProps,
    ...otherSlotProps
  } = slotProps;

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      onChange?.(event, checked);
    },
    [eventStopPropagation, eventPreventDefault, onChange]
  );

  const $Error = useMemo(
    () =>
      !!error && !!errorText ? (
        <ErrorText {...errorProps}>{errorText}</ErrorText>
      ) : null,
    [error, errorText, errorProps]
  );

  const $Label = useMemo(() => {
    if (!label) return null;
    return (
      <>
        <TypographyCommon
          maxLines={3}
          component="label"
          clickable
          {...labelProps}
        >
          <WithRequiredMark required={required}>{label}</WithRequiredMark>
        </TypographyCommon>
        {$Error}
      </>
    );
    return;
  }, [label, required, labelProps, $Error]);

  const inputStyle = useMemo(() => {
    if (!error) return {};
    return {
      style: { color: theme.palette.error.main, ...(inputProps?.style || {}) },
    };
  }, [error, inputProps?.style, theme]);

  const actionRef = useRef<ButtonBaseActions>();

  const $Control = useMemo(() => {
    return (
      <Checkbox
        name={name}
        checked={!!checked}
        onChange={handleOnChange}
        onFocus={(e) => {
          actionRef?.current?.focusVisible?.();
          inputProps?.onFocus?.(e);
        }}
        action={actionRef}
        value={value}
        color="primary"
        inputRef={inputRef}
        {...inputProps}
        {...(inputStyle as any)}
        sx={{
          padding: 0,
          ...inputProps?.sx,
        }}
      />
    );
  }, [name, checked, value, inputProps, inputRef, inputStyle, handleOnChange]);

  return (
    <FormGroupCommon
      label={$Label}
      slotProps={{
        ...otherSlotProps,
        control: {
          maxWidth: "28px",
          xs: false,
          alignItems: "center",
          pt: 0,
          ...controlProps,
        },
        label: {
          pl: 1,
          width: "calc(100% - 28px)",
          xs: false,
          display: "flex",
          ...labelRootProps,
        },
      }}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "flex-start",
        ...sx,
      }}
      {...formControlProps}
      error={error}
    >
      {$Control}
    </FormGroupCommon>
  );
}

type RHFCheckWithLabelProps = RHFInputProps &
  Omit<
    CheckWithLabelProps,
    "checked" | "error" | "onChange" | "value" | "name"
  >;

function RHFCheckWithLabelBase(props: RHFCheckWithLabelProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    label,
    inputProps,
    ...otherProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, name, ref },
      fieldState: { invalid, error },
    }) => (
      <CheckWithLabel
        label={label}
        name={name}
        value={!!value}
        defaultValue={defaultValue ?? undefined}
        checked={value === true}
        {...otherProps}
        onChange={onChange}
        inputRef={ref}
        inputProps={{ onBlur, ...inputProps }}
        error={invalid}
        required={!!rules?.required}
        errorText={error?.message ?? undefined}
      />
    ),
    [rules?.required, inputProps, defaultValue, label, otherProps]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? undefined}
      shouldUnregister={!!shouldUnregister}
      render={renderInput}
    />
  );
}

const rootSx: MuiSx = {
  padding: (theme) => theme.spacing(0.5),
  borderRadius: (theme) => theme.spacing(0.5),
  border: (theme) => `1px solid ${theme.palette.grey[400]}`,
};

function withCommonStyle<P extends CheckWithLabelProps = CheckWithLabelProps>(
  WrappedComponent: ComponentType<P>,
  displayName?: string
) {
  const CompositedComponent = forwardRef<unknown, P>(
    ({ sx, ...otherProps }, ref) => {
      return (
        <WrappedComponent
          sx={{ ...rootSx, ...sx }}
          {...(otherProps as any)}
          ref={ref as any}
        />
      );
    }
  );
  CompositedComponent.displayName = displayName;
  return CompositedComponent;
}

const CheckWithLabel = withCommonStyle(
  CheckWithLabelBase as any,
  "CheckWithLabel"
) as ComponentType<CheckWithLabelProps>;

const RHFCheckWithLabel = withCommonStyle(
  RHFCheckWithLabelBase as any,
  "RHFCheckWithLabel"
) as ComponentType<RHFCheckWithLabelProps>;

export default CheckWithLabel;
export { CheckWithLabelBase, RHFCheckWithLabel, RHFCheckWithLabelBase };
export type { CheckWithLabelProps, RHFCheckWithLabelProps };

