import { styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { type ComponentType, type ReactNode } from "react";

const DefaultSlot = {
  Root: styled(Grid)<GridProps>({}) as (props: GridProps) => JSX.Element,
  Label: styled(Grid)<GridProps>({}) as (props: GridProps) => JSX.Element,
  Control: styled(Grid)<GridProps>({}) as (props: GridProps) => JSX.Element,
};

export type FormGroupCommonProps = Omit<GridProps, "slot"> & {
  label?: ReactNode;
  error?: boolean;
  errorText?: ReactNode;
  slot?: {
    Root?: typeof DefaultSlot.Root | ComponentType<any>;
    Label?: typeof DefaultSlot.Label | ComponentType<any>;
    Control?: typeof DefaultSlot.Control | ComponentType<any>;
  };
  slotProps?: {
    label?: Partial<Parameters<typeof DefaultSlot.Label>[0]>;
    control?: Partial<Parameters<typeof DefaultSlot.Control>[0]>;
  };
};

export function FormGroupCommon({
  label,
  children,
  slotProps,
  slot = {},
  // error,
  // errorText,
  ...otherProps
}: FormGroupCommonProps) {
  const {
    Root = DefaultSlot.Root,
    Label = DefaultSlot.Label,
    Control = DefaultSlot.Control,
  } = slot;

  return (
    <Root component={FormGroup} {...otherProps} container>
      {!label ? null : (
        <Label item component={FormLabel} {...slotProps?.label}>
          {label}
        </Label>
      )}
      <Control item {...slotProps?.control}>
        {children}
      </Control>
    </Root>
  );
}
