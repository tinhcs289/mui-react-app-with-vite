import Divider from "@mui/material/Divider";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { memo } from "react";
import ButtonLogin from "./components/ButtonLogin";
import ButtonLoginViaFacebook from "./components/ButtonLoginViaFacebook";
import FieldKeepMeLoggedIn from "./components/FieldKeepMeLoggedIn";
import FieldPassword from "./components/FieldPassword";
import FieldUserName from "./components/FieldUserName";
import { FormProvider, useFormContext } from "./context";
import useSubmitForm from "./hooks/useSubmitForm";
import type { FormProps } from "./types";

const componentName = "FormLogin";

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
    >
      <Grid item xs={12} mb={2} p={1}>
        <FieldUserName />
      </Grid>
      <Grid item xs={12} mb={2} p={1}>
        <FieldPassword />
      </Grid>
      <Grid item xs={12} mb={2} p={1}>
        <FieldKeepMeLoggedIn />
      </Grid>
      <Grid item xs={12} mb={2} p={1}>
        <ButtonLogin />
      </Grid>
      <Grid item xs={12} mb={2}>
        <Divider />
      </Grid>
      <Grid item xs={12} p={1}>
        <ButtonLoginViaFacebook />
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
