import type { BoxErrorIconProps } from "@/components/box/BoxErrorIcon";
import { BoxErrorIcon } from "@/components/box/BoxErrorIcon";
import {
  FormGroupCommon,
  FormGroupCommonProps,
} from "@/components/form/form-group/FormGroupCommon";
import type { TypographyCommonProps } from "@/components/typo/TypographyCommon";
import { TypographyCommon } from "@/components/typo/TypographyCommon";
import { WithRequiredMark } from "@/components/typo/WithRequiredMark";
import type { RHFInputProps, RHFRenderInput } from "@/types";
import { useTheme } from "@mui/material";
import type { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";
import { default as MuiSwitch } from "@mui/material/Switch";
import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";

export type SwitchProps = Omit<FormGroupCommonProps, "slotProps"> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: Omit<
    MuiSwitchProps,
    "checked" | "error" | "onChange" | "value" | "name"
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

export function Switch(props: SwitchProps) {
  const {
    name,
    label,
    error,
    checked,
    value,
    onChange,
    errorText,
    required,
    inputProps,
    eventStopPropagation = true,
    eventPreventDefault = false,
    slotProps = {},
    ...formControlProps
  } = props;
  const theme = useTheme();

  const {
    error: errorProps,
    label: labelRootProps,
    labelTypography: labelProps,
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
        <BoxErrorIcon
          {...errorProps}
          sx={{ display: "flex", ...errorProps?.sx }}
          slotProps={{
            ...errorProps?.slotProps,
            text: {
              ...errorProps?.slotProps?.text,
              sx: {
                ...errorProps?.slotProps?.text?.sx,
                right: "unset",
                left: "-50%",
              },
            },
          }}
        >
          {errorText}
        </BoxErrorIcon>
      ) : null,
    [error, errorText, errorProps]
  );

  const $Label = useMemo(() => {
    if (!label) return null;
    return (
      <>
        <TypographyCommon maxLines={1} component="label" {...labelProps}>
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
      style: { ...(inputProps?.style || {}), color: theme.palette.error.main },
    };
  }, [error, inputProps?.style, theme]);

  const $Control = useMemo(() => {
    return (
      <MuiSwitch
        name={name}
        checked={!!checked}
        onChange={handleOnChange}
        value={value}
        color="primary"
        {...(inputStyle as any)}
        {...inputProps}
      />
    );
  }, [name, checked, value, inputProps, inputStyle, handleOnChange]);

  return (
    <FormGroupCommon
      label={$Label}
      slotProps={{
        ...otherSlotProps,
        label: {
          display: "flex",
          gap: "4px",
          ...labelRootProps,
        },
      }}
      {...formControlProps}
    >
      {$Control}
    </FormGroupCommon>
  );
}

export type RHFSwitchProps = RHFInputProps &
  Omit<SwitchProps, "checked" | "error" | "onChange" | "value" | "name">;

export default function RHFSwitch(props: RHFSwitchProps) {
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
      <Switch
        label={label}
        name={name}
        value={!!value}
        checked={value === true}
        {...(!!defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        inputProps={{ inputRef: ref, onBlur, ...inputProps }}
        error={invalid}
        {...(!!rules?.required ? { required: true } : {})}
        {...(!!error?.message ? { errorText: error?.message } : {})}
        {...otherProps}
      />
    ),
    [rules?.required, inputProps, defaultValue, label, otherProps]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === "boolean" ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
