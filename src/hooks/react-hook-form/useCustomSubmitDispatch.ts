import { useCallback, useRef } from "react";

export default function useCustomSubmitDispatch() {
  const formRef = useRef<HTMLFormElement>();
  const submitReasonRef = useRef<string | null | undefined>(null);

  const dispatchSubmit = useCallback((reason?: string) => {
    if (!formRef?.current?.dispatchEvent) return;
    if (typeof formRef.current.dispatchEvent !== "function") return;
    submitReasonRef.current = null;
    const SubmitEvent = new Event("submit", {
      cancelable: true,
      bubbles: true,
    });
    submitReasonRef.current = reason || "main_action";
    return formRef.current.dispatchEvent(SubmitEvent);
  }, []);

  return { dispatchSubmit, formRef, submitReasonRef };
}
