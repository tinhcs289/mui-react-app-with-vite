import createStatesContext from "@/helpers/react-context-helpers/createStatesContext";
import {
  RHFValuesInitializer,
  useFormRef,
} from "@/helpers/react-hook-form-helpers";
import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  FormProvider as RHFProvider,
  useForm,
  useFormContext as useRHFContext,
} from "react-hook-form";
import type { FormContextValues, FormStates, FormValues } from "./types";

export function useFormContext() {
  return useRHFContext<FormValues>() as FormContextValues;
}

const {
  StatesProvider,
  useGetState: useGetStateForm,
  useInitState: useInitStateForm,
  useSetState: useSetStateForm,
} = createStatesContext<FormStates>({ formType: "creation" });

export { useGetStateForm, useInitStateForm, useSetStateForm };

function DefaultStatesInitializer({ formType }: Pick<FormStates, "formType">) {
  useInitStateForm("formType", formType, {
    when: "whenever-value-changes",
  });
  return null;
}

export function FormProvider({
  children,
  values,
  defaultValues,
  formType,
}: {
  children?: ReactNode;
  values?: Partial<FormValues>;
  defaultValues?: Partial<FormValues>;
} & Pick<FormStates, "formType">) {
  const { formRef, submitReasonRef, dispatchSubmit } = useFormRef();

  const form = useForm<FormValues>({
    defaultValues,
  });

  const contextValue = useMemo(
    () => ({
      ...form,
      formRef,
      submitReasonRef,
      dispatchSubmit,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatchSubmit, form]
  );

  return (
    <StatesProvider>
      <RHFProvider {...(contextValue as any)}>
        <DefaultStatesInitializer formType={formType} />
        <RHFValuesInitializer values={values} defaultValues={defaultValues} />
        {children}
      </RHFProvider>
    </StatesProvider>
  );
}
