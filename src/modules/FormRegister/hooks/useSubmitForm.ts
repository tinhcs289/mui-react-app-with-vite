import type { FormEventHandler } from "react";
import { useMemo } from "react";
import { useFormContext } from "../context";

export default function useSubmitForm() {
  const { handleSubmit } = useFormContext();

  const onSubmit: FormEventHandler<HTMLFormElement> = useMemo(
    () =>
      handleSubmit?.((values) => {
        console.log(values);
      }),
    [handleSubmit]
  );

  return { onSubmit };
}
