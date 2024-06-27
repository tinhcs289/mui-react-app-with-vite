import { HttpRequestStatus } from "@/constants/http-request-status";
import PATHS from "@/constants/paths";
import { useReturnUriWhenUnAuthenticate } from "@/hooks/common-hooks/useReturnUri";
import { actions, loginRequestStatusSelector } from "@/redux/authentication";
import type { FormEventHandler } from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext, useInitStateForm } from "../context";

function redirectToNextPage(returnUri?: string) {
  if (
    !(
      !!window &&
      !!window?.location &&
      typeof window.location.replace === "function"
    )
  )
    return;

  window.location.replace(returnUri || PATHS.main);
}

export default function useSubmitForm() {
  const { handleSubmit } = useFormContext();

  const requestStatus = useSelector(loginRequestStatusSelector);

  const submitting = useMemo(
    () => requestStatus === HttpRequestStatus.REQUESTING,
    [requestStatus]
  );

  useInitStateForm("submitting", submitting, {
    when: "whenever-value-changes",
  });

  const isSuccess = useMemo(
    () => requestStatus === HttpRequestStatus.REQUESTSUCCESS,
    [requestStatus]
  );
  const dispatch = useDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = useMemo(
    () =>
      handleSubmit?.((values) => {
        if (submitting) return;

        dispatch(
          actions.requestLogin({
            username: values?.username || "",
            password: values?.password || "",
          })
        );
      }),
    [submitting, handleSubmit, dispatch]
  );

  const { returnUri } = useReturnUriWhenUnAuthenticate();

  useEffect(() => {
    if (!isSuccess) return;
    if (!returnUri) returnUri;
    redirectToNextPage(returnUri);
  }, [isSuccess, returnUri]);

  return { onSubmit };
}
