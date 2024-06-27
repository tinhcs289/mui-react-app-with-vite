import { styled } from "@mui/material";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { forwardRef, memo } from "react";
import ButtonSubmit from "./components/ButtonSubmit";
import FieldCheck from "./components/FieldCheck";
import FieldCheckGroup from "./components/FieldCheckGroup";
import FieldDatePicker from "./components/FieldDatePicker";
import FieldDateTimePicker from "./components/FieldDateTimePicker";
import FieldNumberAdjustable from "./components/FieldNumberAdjustable";
import FieldRadio from "./components/FieldRadio";
import FieldRadioGroup from "./components/FieldRadioGroup";
import FieldSelect from "./components/FieldSelect";
import FieldSelectMulti from "./components/FieldSelectMulti";
import FieldSwitch from "./components/FieldSwitch";
import FieldSwitchGroup from "./components/FieldSwitchGroup";
import FieldText from "./components/FieldText";
import FieldTextArea from "./components/FieldTextArea";
import FieldTextCurrency from "./components/FieldTextCurrency";
import FieldTextNumber from "./components/FieldTextNumber";
import FieldTextPercent from "./components/FieldTextPercent";
import FieldTimePicker from "./components/FieldTimePicker";

import { FormProvider, useFormContext } from "./context";
import useSubmitForm from "./hooks/useSubmitForm";
import type { FormProps } from "./types";

const componentName = "FormDemo";

const GridField = styled(
  forwardRef<HTMLElement, GridProps>(
    ({ children, xs = 12, item = true, ...props }, ref) => (
      <Grid xs={xs} item={item} {...(props as any)} ref={ref}>
        {children}
      </Grid>
    )
  )
)<GridProps>(({ theme }) => ({
  padding: theme.spacing(1),
  ":not(:last-child)": {
    marginBottom: theme.spacing(2),
  },
}));

const FormContent = memo((props: Partial<GridProps<"form">>) => {
  const { formRef } = useFormContext();
  const { onSubmit } = useSubmitForm();
  return (
    <Grid
      container
      width="100%"
      {...props}
      component="form"
      onSubmit={onSubmit}
      noValidate
      ref={formRef}
      autoComplete="off"
      height="100%"
    >
      <Grid item xs={12} p={0} height="100%" container>
        <Grid
          item
          xs={12}
          container
          sx={{
            p: 0,
            overflowY: "auto",
            maxHeight: "calc(100% - 44px)",
          }}
        >
          <GridField>
            <FieldText />
          </GridField>
          <GridField>
            <FieldTextArea />
          </GridField>
          <GridField>
            <FieldTextNumber />
          </GridField>
          <GridField>
            <FieldTextCurrency />
          </GridField>
          <GridField>
            <FieldTextPercent />
          </GridField>
          <GridField>
            <FieldNumberAdjustable />
          </GridField>
          <GridField>
            <FieldSelect />
          </GridField>
          <GridField>
            <FieldSelectMulti />
          </GridField>
          <GridField>
            <FieldCheck />
          </GridField>
          <GridField>
            <FieldSwitch />
          </GridField>
          <GridField>
            <FieldRadio />
          </GridField>
          <GridField>
            <FieldDatePicker />
          </GridField>
          <GridField>
            <FieldDateTimePicker />
          </GridField>
          <GridField>
            <FieldTimePicker />
          </GridField>

          <GridField>
            <FieldCheckGroup />
          </GridField>
          <GridField>
            <FieldSwitchGroup />
          </GridField>
          <GridField>
            <FieldRadioGroup />
          </GridField>
        </Grid>
        <GridField height="44px">
          <ButtonSubmit />
        </GridField>
      </Grid>
    </Grid>
  );
});

FormContent.displayName = `${componentName}Content`;

export const Form = memo(
  ({
    defaultValues,
    values,
    formType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClose,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open,
    ...otherProps
  }: FormProps) => {
    return (
      <FormProvider
        defaultValues={defaultValues}
        values={values}
        formType={formType}
      >
        <FormContent {...otherProps} />
      </FormProvider>
    );
  }
);

Form.displayName = componentName;
