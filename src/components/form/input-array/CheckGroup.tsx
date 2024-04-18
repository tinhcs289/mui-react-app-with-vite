import type { BoxErrorIconProps } from "@/components/box/BoxErrorIcon";
import { BoxErrorIcon } from "@/components/box/BoxErrorIcon";
import type { FormGroupCommonProps } from "@/components/form/form-group/FormGroupCommon";
import { FormGroupCommon } from "@/components/form/form-group/FormGroupCommon";
import type { CheckProps } from "@/components/form/input-boolean/Check";
import { Check } from "@/components/form/input-boolean/Check";
import type { TypographyCommonProps } from "@/components/typo/TypographyCommon";
import { TypographyCommon } from "@/components/typo/TypographyCommon";
import { WithRequiredMark } from "@/components/typo/WithRequiredMark";
import removeAt from "@/helpers/array-helpers/removeAt";
import type { AnyObject, Option, RHFInputProps, RHFRenderInput } from "@/types";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";

export type CheckGroupOption<T extends AnyObject = AnyObject> = Option<
  T & {
    InputProps?: Omit<
      CheckProps,
      "name" | "label" | "value" | "checked" | "disabled"
    >;
  }
>;

export type CheckGroupProps<T extends AnyObject = AnyObject> = Omit<
  FormGroupCommonProps,
  "onChange" | "slotProps"
> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: CheckGroupOption<T>[];
  value?: CheckGroupOption<T>[];
  onChange?: (options?: CheckGroupOption<T>[]) => void;
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

export default function CheckGroup<T extends AnyObject = AnyObject>(
  props: CheckGroupProps<T>
) {
  const {
    name,
    label,
    required,
    error,
    onChange,
    errorText,
    options,
    value,
    eventStopPropagation = true,
    eventPreventDefault = false,
    slotProps = {},
    ...formControlProps
  } = props;

  const {
    error: errorProps,
    label: labelRootProps,
    labelTypography: labelProps,
    ...otherSlotProps
  } = slotProps;

  const memoOption = useMemo(() => {
    return options instanceof Array && options.length > 0 ? options : [];
  }, [options]);

  const memoValue = useMemo(() => {
    return value instanceof Array && value.length > 0 ? value : [];
  }, [value]);

  const isChecked = useCallback(
    (option: CheckGroupOption<T>) => {
      return (
        (memoValue.length > 0 &&
          memoValue.findIndex((v) => v.value === option.value) >= 0) ||
        !!option?.checked
      );
    },
    [memoValue]
  );

  const handleOnchange = useCallback(
    (event: any) => {
      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      if (!event?.target?.value) return;
      const val = event.target.value as string;
      const checked = !!event?.target?.checked;
      if (checked) {
        if (memoOption.length === 0) return;
        const i = memoOption.findIndex((o) => o.value === val);
        if (i < 0) return;
        onChange?.([...memoValue, memoOption[i]]);
      } else {
        if (memoValue.length === 0) return;
        const j = memoValue.findIndex((o) => o.value === val);
        if (j < 0) return;
        onChange?.(removeAt(memoValue, j));
      }
    },
    [memoOption, memoValue, onChange, eventStopPropagation, eventPreventDefault]
  );

  const $Options = useMemo(() => {
    return memoOption.map((option) => {
      const checked = isChecked(option);
      return (
        <Check
          key={option.value}
          value={option.value}
          name={name}
          checked={checked}
          label={option?.label || option?.name || ""}
          error={error}
          eventStopPropagation={false}
          {...option?.InputProps}
          inputProps={{
            ...option?.InputProps?.inputProps,
            disabled: !!option?.disabled,
          }}
        />
      );
    });
  }, [name, memoOption, error, isChecked]);

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

  return (
    <FormGroupCommon
      onChange={handleOnchange as any}
      {...formControlProps}
      label={$Label}
      slotProps={{
        ...otherSlotProps,
        label: {
          ...labelRootProps,
          display: "flex",
          gap: "4px",
        },
      }}
    >
      {$Options}
    </FormGroupCommon>
  );
}

export type RHFCheckGroupProps = RHFInputProps &
  Omit<
    CheckGroupProps,
    "errorText" | "error" | "onChange" | "value" | "name"
  > & {
    defaultValue?: string;
  };

export function RHFCheckGroup(props: RHFCheckGroupProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    label,
    ...inputProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, name },
      fieldState: { invalid, error },
    }) => (
      <CheckGroup
        label={label}
        name={name}
        value={value}
        {...(!!defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        onBlur={onBlur}
        error={invalid}
        {...(!!rules?.required ? { required: true } : {})}
        {...(!!error?.message ? { errorText: error?.message } : {})}
        {...inputProps}
      />
    ),
    [rules?.required, inputProps, defaultValue, label]
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
