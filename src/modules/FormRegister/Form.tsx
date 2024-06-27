import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { memo } from "react";
import ButtonRegister from "./components/ButtonRegister";
import FieldAcceptWithTernAndCondition from "./components/FieldAcceptWithTernAndCondition";
import FieldEmail from "./components/FieldEmail";
import FieldFirstName from "./components/FieldFirstName";
import FieldLastName from "./components/FieldLastName";
import FieldPassword from "./components/FieldPassword";
import FieldPasswordReEntered from "./components/FieldPasswordReEntered";
import FieldUserName from "./components/FieldUserName";
import { FormProvider, useFormContext } from "./context";
import useSubmitForm from "./hooks/useSubmitForm";
import type { FormProps } from "./types";

const componentName = "FormRegister";

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
      ref={formRef}
      noValidate
      autoComplete="off"
    >
      <Grid item xs={12} mb={2} container>
        <Grid item xs={12} sm={6} p={1}>
          <FieldFirstName />
        </Grid>
        <Grid item xs={12} sm={6} p={1}>
          <FieldLastName />
        </Grid>
      </Grid>
      <Grid item xs={12} mb={2} container>
        <Grid item xs={12} sm={6} p={1}>
          <FieldUserName />
        </Grid>
        <Grid item xs={12} sm={6} p={1}>
          <FieldEmail />
        </Grid>
      </Grid>
      <Grid item xs={12} mb={2} container>
        <Grid item xs={12} sm={6} p={1}>
          <FieldPassword />
        </Grid>
        <Grid item xs={12} sm={6} p={1}>
          <FieldPasswordReEntered />
        </Grid>
      </Grid>
      <Grid item xs={12} mb={2} p={1}>
        <FieldAcceptWithTernAndCondition />
      </Grid>
      <Grid item xs={12} mb={2} p={1}>
        <ButtonRegister />
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
    namePrefix,
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
